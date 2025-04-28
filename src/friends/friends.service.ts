import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { FriendEntity } from "./friend.entity";
import { Prisma } from "@prisma/client";

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async sendFriendRequest(
    userId: number,
    friendId: number
  ): Promise<FriendEntity> {
    const friendRequest = await this.prisma.friend.create({
      data: {
        userId,
        friendId,
        status: "PENDING",
      },
    });

    return new FriendEntity(friendRequest);
  }

  async acceptFriendRequest(requestId: number): Promise<FriendEntity> {
    const acceptedFriend = await this.prisma.friend.update({
      where: { id: requestId },
      data: { status: "ACCEPTED" },
    });

    return new FriendEntity(acceptedFriend);
  }

  async getFriends(
    userId: number,
    search?: string,
    limit = 10,
    offset = 0
  ): Promise<{
    friends: FriendEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const whereClause: Prisma.FriendWhereInput = {
      status: "ACCEPTED",
      OR: [{ userId: userId }, { friendId: userId }],
    };

    // Find total count first (before pagination)
    const total = await this.prisma.friend.count({
      where: whereClause,
    });

    const friends = await this.prisma.friend.findMany({
      where: whereClause,
      include: {
        user: true,
        friend: true,
      },
      take: limit,
      skip: offset,
    });

    // Apply search filter (optional)
    const filteredFriends = friends.filter((friend) => {
      const otherUser = friend.userId === userId ? friend.friend : friend.user;
      if (!search) return true;
      const searchLower = search.toLowerCase();
      return (
        otherUser.name.toLowerCase().includes(searchLower) ||
        otherUser.email?.toLowerCase().includes(searchLower)
      );
    });

    const page = Math.floor(offset / limit) + 1;

    return {
      friends: filteredFriends.map((friend) => new FriendEntity(friend)),
      total,
      page,
      limit,
    };
  }

  async getIncomingFriendRequests(userId: number): Promise<FriendEntity[]> {
    const requests = await this.prisma.friend.findMany({
      where: {
        friendId: userId,
        status: "PENDING",
      },
      include: {
        user: true, // info about who sent the request
      },
    });

    return requests.map((request) => new FriendEntity(request));
  }
}

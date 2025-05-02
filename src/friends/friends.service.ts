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

  async getFriends(userId: number, search?: string): Promise<FriendEntity[]> {
    const whereClause: Prisma.FriendWhereInput = {
      status: "ACCEPTED",
      OR: [{ userId: userId }, { friendId: userId }],
    };

    const friends = await this.prisma.friend.findMany({
      where: whereClause,
      include: {
        user: true,
        friend: true,
      },
    });

    return friends
      .filter((friend) => {
        const otherUser =
          friend.userId === userId ? friend.friend : friend.user;
        if (!search) return true;
        const searchLower = search.toLowerCase();
        return (
          otherUser.name.toLowerCase().includes(searchLower) ||
          otherUser.email?.toLowerCase().includes(searchLower)
        );
      })
      .map((friend) => new FriendEntity(friend));
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

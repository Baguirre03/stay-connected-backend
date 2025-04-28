import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { FriendEntity } from "./friend.entity";

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

  async getFriends(userId: number): Promise<FriendEntity[]> {
    const friends = await this.prisma.friend.findMany({
      where: {
        OR: [
          { userId, status: "ACCEPTED" },
          { friendId: userId, status: "ACCEPTED" },
        ],
      },
    });

    return friends.map((friend) => new FriendEntity(friend));
  }
}

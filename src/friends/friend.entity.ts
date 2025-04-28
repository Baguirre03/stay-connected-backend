import { Exclude, Expose, Type } from "class-transformer";
import { UserEntity } from "../users/user.entity";

export class FriendEntity {
  id: number;
  userId: number;
  friendId: number;
  status: "PENDING" | "ACCEPTED";
  createdAt: Date;

  @Exclude()
  user?: UserEntity;

  @Exclude()
  friend?: UserEntity;

  constructor(partial: Partial<FriendEntity>) {
    Object.assign(this, partial);
  }
}

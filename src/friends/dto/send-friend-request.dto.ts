import { IsInt } from "class-validator";

export class SendFriendRequestDto {
  @IsInt()
  userId: number;

  @IsInt()
  friendId: number;
}

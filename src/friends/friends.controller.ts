import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Get,
  Req,
} from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { SendFriendRequestDto } from "./dto/send-friend-request.dto";
import { RequestWithUser } from "../auth/types/request-with-user";

@UseGuards(JwtAuthGuard)
@Controller("friends")
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post("request")
  async sendRequest(@Body() sendFriendRequestDto: SendFriendRequestDto) {
    const { userId, friendId } = sendFriendRequestDto;
    return this.friendsService.sendFriendRequest(userId, friendId);
  }

  @Patch("accept/:id")
  async acceptRequest(@Param("id") id: string) {
    return this.friendsService.acceptFriendRequest(+id);
  }

  @Get()
  async getFriends(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    return this.friendsService.getFriends(userId);
  }
}

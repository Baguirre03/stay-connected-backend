import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Get,
  Req,
  Query,
  Res,
  BadRequestException,
} from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { SendFriendRequestDto } from "./dto/send-friend-request.dto";
import { RequestWithUser } from "../auth/types/request-with-user";
import { Response } from "express";

@UseGuards(JwtAuthGuard)
@Controller("friends")
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post("request")
  async sendRequest(
    @Body() sendFriendRequestDto: SendFriendRequestDto,
    @Res() res?: Response
  ) {
    const { userId, friendId } = sendFriendRequestDto;
    const result = await this.friendsService.sendFriendRequest(
      userId,
      friendId
    );
    return res ? res.send(result) : result;
  }

  @Patch("accept/:id") // accept the id of the freindRequest
  async acceptRequest(@Param("id") id: string, @Res() res?: Response) {
    const result = await this.friendsService.acceptFriendRequest(+id);
    return res ? res.send(result) : result;
  }

  @Get()
  async getFriends(
    @Req() req: RequestWithUser,
    @Query("search") search?: string,
    @Res() res?: Response
  ) {
    const userId = req.user.userId;

    const result = await this.friendsService.getFriends(userId, search);

    return res ? res.send(result) : result;
  }

  @Get("requests")
  async getIncomingRequests(
    @Req() req: RequestWithUser,
    @Res() res?: Response
  ) {
    const userId = req.user.userId;
    const result = await this.friendsService.getIncomingFriendRequests(userId);
    return res ? res.send(result) : result;
  }
}

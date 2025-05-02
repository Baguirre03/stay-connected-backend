import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
  Res,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RequestWithUser } from "../auth/types/request-with-user";
import { Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.createUser(createUserDto);
    return res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getMe(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = await this.usersService.getUserById(req.user.userId);
    return res.send(user);
  }

  @Get(":id")
  async getUser(@Param("id") id: number, @Res() res: Response) {
    const user = await this.usersService.getUserById(id);
    return res.send(user);
  }

  @Get()
  async getAllUsers(@Res() res: Response) {
    const users = await this.usersService.getAllUsers();
    return res.send(users);
  }

  @Patch(":id")
  async updateUser(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response
  ) {
    const user = await this.usersService.updateUser(id, updateUserDto);
    return res.send(user);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number, @Res() res: Response) {
    await this.usersService.deleteUser(id);
    return res.send({ message: "User deleted successfully" });
  }
}

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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Request } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RequestWithUser } from "../auth/types/request-with-user";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(":id")
  async getUser(@Param("id") id: number) {
    return this.usersService.getUserById(id);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Patch(":id")
  async updateUser(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number) {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getMe(@Req() req: RequestWithUser) {
    return this.usersService.getUserById(req.user.userId);
  }
}

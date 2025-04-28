import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { UserEntity } from "./user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new UserEntity(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async updateUser(id: number, data: any): Promise<UserEntity> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10); // hash if password is being updated
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return new UserEntity(updatedUser);
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}

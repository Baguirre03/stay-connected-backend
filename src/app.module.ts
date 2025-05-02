import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { FriendsModule } from "./friends/friends.module";
import { PrismaService } from "./database/prisma.service";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [AuthModule, UsersModule, FriendsModule, DatabaseModule],
  providers: [PrismaService],
})
export class AppModule {}

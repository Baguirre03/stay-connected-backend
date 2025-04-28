import { Controller, Post, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() body: any, @Res() res: Response) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    const token = await this.authService.login(user);

    res.cookie("jwt", token.access_token, { httpOnly: true });
    return res.send({ message: "Logged in" });
  }
}

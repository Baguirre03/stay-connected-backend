import { Controller, Post, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const { access_token, user: userData } = await this.authService.login(user);

    res.cookie("jwt", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.send({ user: userData });
  }
}

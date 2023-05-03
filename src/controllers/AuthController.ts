import { Request, Response } from "express";
import UserType from "../models/User/User";
import AuthRepo from "../repo/AuthRepo";
import UserRepo from "../repo/UserRepo";

class AuthController {
  static ResetPassword = async (req: Request, res: Response) => {
    const { key, password } = req.body;
    try {
      const user = await AuthRepo.getUserByResetCode(key);
      await AuthRepo.setNewPassword(AuthRepo.encrypt(password), user.id);
      await AuthRepo.deleteResetCode(user.id);
      res.sendStatus(200);
    } catch {
      res.sendStatus(400);
    }
  };

  public static WhoAmI = async (req: Request, res: Response) => {
    try {
      const token = req.cookies["token"];
      const user = AuthRepo.decodeJwt(token);
      res.status(200).json(user);
    } catch {
      res.status(400).send("Invalid credentials");
    }
  };

  public static AuthenticateUser = async (req: Request, res: Response) => {
    try {
      const { email, password, rememberMe } = req.body;
      let user: Partial<UserType> | null = null;
      const userWithEmail = await UserRepo.getUserByEmail(email);
      if (
        userWithEmail.password &&
        AuthRepo.decrypt(userWithEmail.password) === password
      ) {
        user = { ...userWithEmail, role: userWithEmail.role };
      }
      delete user?.password;
      const token = AuthRepo.generateJwt(user);
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.setHeader("Access-Control-Allow-Credentials", "true");

      if (rememberMe == true) {
        res.cookie("token", token, { maxAge: 604800000, httpOnly: true });
      } else {
        res.cookie("token", token, { httpOnly: true });
      }
      res.status(200).json({ token });
    } catch {
      res.status(400).send("Invalid email or password!");
    }
  };
}

export default AuthController;

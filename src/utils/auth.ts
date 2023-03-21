import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserInterface } from "../db/models/user";
import { User } from "../db/models";

const user = new User();
dotenv.config();

// interface AuthInterface extends UserInterface {
interface AuthInterface {
  user: UserInterface;
  token: string;
  expiresIn: number;
  expirationTime: string;
}

export class Auth {
  auth: AuthInterface;
  jwtSecret: Secret;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET!;
    this.auth = {
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        passwordResetExpires: "",
        passwordResetToken: "",
      },
      token: "",
      expiresIn: 0,
      expirationTime: "",
    };
  }

  authenticate(user: UserInterface) {
    const auth = this.auth;
    auth.user = user;
    auth.user.password = "";

    const jwtSecret: Secret = process.env.JWT_SECRET!;
    const JWT_EXPIRES_IN: number = parseInt(process.env.JWT_EXPIRES_IN_HOURS!);
    auth.expiresIn = JWT_EXPIRES_IN * 60 * 60 * 1000;

    const id: string = auth.user.id;

    auth.token = jwt.sign({ id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN_HOURS,
    });
    auth.expirationTime = new Date(Date.now() + auth.expiresIn).toISOString();

    console.log("user auth");
    console.log(auth);

    return auth;
  }

  // async verify(token: string) {
  // async verify(context: any) {
  // console.log("context")
  // console.log(context)
  async verify(authHeader: any) {
    let token;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }
    if (!token) throw new Error("You have no token, please login!");

    const decoded: any = jwt.verify(token, this.jwtSecret);
    const expiresIn: number = (decoded.exp - decoded.iat) * 1000;

    const expiryTime = new Date(Date.now() + expiresIn);
    const currentTime = new Date(Date.now());
    const isExpired: boolean = expiryTime < currentTime;

    if (isExpired) {
      throw new Error("Token expired, please login!");
    }
    const savedUser = await user.findById(decoded.id);
    if (!savedUser) {
      throw new Error("The user belonging to this token no longer exists!");
    }
  }
}

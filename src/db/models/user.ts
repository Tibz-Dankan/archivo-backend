// import { hash, compare } from "bcryptjs";
import bcryptjs from "bcryptjs";
const { hash, compare } = bcryptjs;

import { randomBytes, createHash } from "crypto";

import { PrismaClient } from "@prisma/client";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: string; // ISOString date
}

export default class User {
  prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(user: UserInterface) {
    user.password = await hash(`${user.password}`, 10);

    return await this.prisma.user.create({
      data: user,
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
      },
    });
  }

  async findMany() {
    return await this.prisma.user.findMany({});
  }

  async findById(id: Number) {
    return await this.prisma.user.findFirst({
      where: {
        id: { equals: id },
      },
    });
  }

  async findByEmail(email: String) {
    return await this.prisma.user.findFirst({
      where: {
        email: { equals: email },
      },
    });
  }

  async update(id: Number, name: String, email: String) {
    return await this.prisma.user.update({
      where: {
        id: { equals: id },
      },
      data: {
        name: name,
        email: email,
      },
    });
  }

  async updatePassword(id: Number, newPassword: String) {
    const newHashedPassword = await hash(`${newPassword}`, 10);
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: newHashedPassword,
      },
    });
  }

  async comparePasswords(currentPassword: String, savedPassword: String) {
    return await compare(`${currentPassword}`, `${savedPassword}`);
  }

  createPasswordResetToken() {
    const resetToken = randomBytes(32).toString("hex");
    return resetToken;
  }

  async savePasswordResetToken(id: Number, resetToken: String) {
    const hashedToken = createHash("sha256")
      .update(`${resetToken}`)
      .digest("hex");

    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        passwordResetToken: hashedToken,
        passwordResetExpires: new Date(Date.now() + 1000 * 60 * 20),
      },
    });
  }

  async updatePasswordResetToken(user: UserInterface) {
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordResetToken: user.passwordResetToken,
        passwordResetExpires: user.passwordResetExpires,
      },
    });
  }

  async passwordResetExpired(expiryDate: String) {
    return new Date(`${expiryDate}`) < new Date(Date.now());
  }
}

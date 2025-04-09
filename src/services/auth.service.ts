import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/**
 * @param fullName
 * @param email
 * @param password
 * @returns newly created user
 */

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
  });

  return newUser;
};

import { User } from "@prisma/client";

export const sanitiizeUser = (user: User) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with full name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad Request (email already in use or missing fields)
 *       500:
 *         description: Server Error
 */
export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ msg: "All fields are required." });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser)
      return res.status(400).json({ msg: "Email already used" });

    const user = await registerUser(fullName, email, password);

    return res.status(200).json({ msg: "User created successfully", user });
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
};

import prisma from '../prisma';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

export const signup = async (email: string, password: string) => {

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
};


export const login = async (email: string, password: string) => {

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) throw new Error('Invalid password');

  const token = generateToken(user.id);
  return { user, token };
};

export const logout = async (userId: string) => {
  return { message: 'Logged out successfully' };
};
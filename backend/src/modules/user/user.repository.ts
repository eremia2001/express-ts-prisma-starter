import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const userRepository = {
  async create(email: string, password: string): Promise<User> {
    return prisma.user.create({
      data: {
        email,
        password,
      },
    });
  },

  async getUsers(): Promise<User[]> {
    return prisma.user.findMany();
  },

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  async update(id: number, data: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  },

  async delete(id: number): Promise<User> {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  },
};

export default userRepository;

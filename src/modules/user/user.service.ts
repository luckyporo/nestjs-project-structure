import type { UserModel } from './user.model';
import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async addUser(name: string): Promise<UserModel> {
    return this.prismaService.user.create({
      data: {
        name,
        email: `${name}@example.com`,
      },
    });
  }

  public async getUserByName(name: string): Promise<UserModel> {
    return this.prismaService.user.findFirstOrThrow({
      where: {
        name,
      },
    });
  }

  public async updateUser(id: number, name: string): Promise<UserModel> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        name,
        email: `${name}@example.com`,
      },
    });
  }

  public async deleteUser(id: number): Promise<UserModel> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}

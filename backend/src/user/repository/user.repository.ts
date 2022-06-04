import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserInput, UpdateUserInput } from '@user/models/user.model';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  findUserByUserEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        userEmail: email,
      },
    });
  }

  createUser(user: CreateUserInput) {
    return this.prismaService.user.create({
      data: {
        userEmail: user.userEmail,
        userName: user.userName,
        password: user.password,
        role: user.role,
      },
    });
  }

  updateUser(userData: UpdateUserInput) {
    return this.prismaService.user.update({
      data: {
        userName: userData.userName,
        password: userData.password,
        role: userData.role,
      },
      where: {
        id: userData.userId,
      },
    });
  }

  findUserById(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private service: PrismaService,
  ) {}

  @Get('post')
  async getPostList(@Param('id') id: string, @Param('take') take: number) {
    return this.service.post.findMany({
      take,
      // where: {
      //   title: {
      //     contains: '1',
      //   },
      // },
      orderBy: {
        created_at: 'asc',
      },
    });
  }
}

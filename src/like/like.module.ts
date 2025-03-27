import { Module } from '@nestjs/common';
import { LikeResolver } from './like.resolver';
import { PrismaService } from 'nestjs-prisma';

@Module({
  providers: [LikeResolver, PrismaService],
})
export class LikeModule {}

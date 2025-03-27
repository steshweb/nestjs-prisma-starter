import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Like } from './models/like.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../src/auth/gql-auth.guard';
import { UserEntity } from '../../src/common/decorators/user.decorator';
import { User } from '@prisma/client';
import { PostIdArgs } from './args/post-id.args';
import { LikeIdArgs } from './args/like-id.args';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Like)
  async createLike(
    @Args() args: PostIdArgs,
    @UserEntity() user: User,
  ): Promise<Like> {
    return this.prisma.like.create({
      data: {
        postId: args.postId,
        authorId: user.id,
      },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteLike(
    @Args() args: LikeIdArgs,
    @UserEntity() user: User,
  ): Promise<boolean> {
    const like = await this.prisma.like.findUnique({
      where: { id: args.likeId },
    });

    if (!like) throw new NotFoundException('Like not found');

    if (like.authorId !== user.id)
      throw new ForbiddenException('You are not the author of this like');

    await this.prisma.like.delete({
      where: { id: args.likeId },
    });

    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Like])
  async getLikes(@Args() args: PostIdArgs): Promise<Like[]> {
    return this.prisma.like.findMany({ where: { postId: args.postId } });
  }
}

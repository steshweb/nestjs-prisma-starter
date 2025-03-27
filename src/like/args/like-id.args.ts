import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class LikeIdArgs {
  @Field()
  @IsNotEmpty()
  likeId: string;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Like extends BaseModel {
  @Field()
  postId: string;

  @Field()
  authorId: string;
}

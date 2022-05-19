import {
  ObjectType,
  Field,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field({ nullable: true })
  content: string;
  @Field((type) => Date)
  update_time: Date;
  @Field((type) => Date)
  create_time: Date;
}

@InputType()
export class PostOrderByUpdatedAtInput {
  @Field((type) => SortOrder)
  createTime: SortOrder;
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

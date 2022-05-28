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
  @Field((type) => Date, { name: 'updatedAt' })
  updated_at: Date;
  @Field((type) => Date, { name: 'createdAt' })
  created_at: Date;
}

@InputType()
export class PostOrderByUpdatedAtInput {
  @Field((type) => SortOrder)
  createdAt: SortOrder;
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

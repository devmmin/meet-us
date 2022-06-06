import {
  ObjectType,
  Field,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { PostRepository } from '@post/repository/post.repository';
import { Prisma } from '@prisma/client';

@ObjectType()
export class Author {
  @Field()
  id: string;
  @Field()
  userName: string;
}

@ObjectType()
export class PostDto {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  content: string;
  @Field()
  authorId: string;
  @Field(() => Author)
  author?: Author;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => Date)
  createdAt: Date;
}

@ObjectType()
export class Post {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  content: string;
  @Field()
  authorId: string;
  @Field(() => Author)
  author?: Author;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => Date)
  createdAt: Date;
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  content: string;
  @Field()
  authorId: string;
}

@InputType()
export class UpdatePostInput {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field({ nullable: true })
  content: string;
}

@InputType()
export class DeletePostInput {
  @Field()
  id: string;
}

@InputType()
export class PostByIdInput {
  @Field()
  id: string;
}

@InputType()
export class PostOrderByUpdatedAtInput {
  @Field(() => SortOrder)
  createdAt: SortOrder;
}
@InputType()
export class Pagenation {
  @Field()
  skip: number;
  @Field()
  take: number;
}

@InputType()
export class PostsOrder {
  @Field()
  orderBy: PostOrderByUpdatedAtInput;
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

export type PostsWithAuthor = Prisma.PromiseReturnType<
  PostRepository['getPosts']
>;

import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  registerEnumType,
} from '@nestjs/graphql';
import { PostRepository } from '@post/repository/post.repository';
import { Prisma } from '@prisma/client';

/* Post Base Api Modal */
@ObjectType()
export class Author {
  @Field()
  id: string;
  @Field()
  userName: string;
}
@ObjectType()
export class Post {
  @Field({ name: 'postId', description: 'Post id' })
  id: string;
  @Field({ description: 'Post 제목' })
  title: string;
  @Field({ description: 'Post 내용' })
  content: string;
  @Field(() => PostStatus, { description: 'Post 상태' })
  status: PostStatus;
  @Field({ description: '작성자 User Id' })
  authorId: string;
  @Field(() => Author, { nullable: true, description: '작성자 정보' })
  author?: Author;
  @Field(() => Date, { description: '수정 일시' })
  updatedAt: Date;
  @Field(() => Date, { description: '생성 일시' })
  createdAt: Date;
}

/* Post Mutate Api Modal */
@InputType()
export class CreatePostInput {
  @Field({ description: 'Post 제목' })
  title: string;
  @Field({ nullable: true, description: 'Post 내용' })
  content: string;
  authorId: string;
}

@InputType()
export class UpdatePostInput {
  @Field({ description: 'Post Id' })
  id: string;
  @Field({ description: 'Post 제목' })
  title: string;
  @Field({ nullable: true, description: 'Post 내용' })
  content: string;
}

@InputType()
export class DeletePostInput {
  @Field({ description: '삭제할 Post id' })
  id: string;
}
@InputType()
export class PostByIdInput {
  @Field()
  id: string;
}

@ObjectType()
export class PostWithoutAuthor extends OmitType(Post, ['author'] as const) {}

/* Post Query Api Modal */

@ObjectType()
export class Posts {
  @Field(() => [Post], { description: 'Post 목록' })
  list: Array<Post>;
  @Field(() => Number, { description: 'Post 전체 갯수' })
  totalCount: number;
}

export type PostsWithAuthor = Prisma.PromiseReturnType<
  PostRepository['getPosts']
>;

/* Paging Modal */

@InputType()
export class OffsetPagination {
  @Field({ description: '조회시 지정된 Recode 만큼 패스할 갯수' })
  skip: number;
  @Field({ description: '가져올 데이터 갯수' })
  take: number;
}

@InputType({
  description: 'Post 조회 Order(정렬) 데이터 타입',
})
export class PostsOrder {
  @Field(() => SortOrder, {
    nullable: true,
    description: '생성일자',
    defaultValue: 'desc',
  })
  createdAt: SortOrder;
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: '지원되는 정렬 타입',
  valuesMap: {
    asc: {
      description: '오름차순',
    },
    desc: {
      description: '내림차순',
    },
  },
});

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

registerEnumType(PostStatus, {
  name: 'PostStatus',
  description: '지원되는 정렬 타입',
  valuesMap: {
    DRAFT: {
      description: 'DRAFT - 임시저장',
    },
    PUBLISHED: {
      description: 'PUBLISHED - 발행됨',
    },
  },
});

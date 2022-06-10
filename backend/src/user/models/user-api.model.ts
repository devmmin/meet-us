import { AggregateRoot } from '@nestjs/cqrs';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export class UserAggregateRoot extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }
}

/* User Base Api Modal */

@ObjectType()
export class User {
  @Field({ name: 'userId' })
  id: string;
  @Field({ name: 'userName' })
  userName: string;
  @Field()
  role: Role;
  @Field(() => Date, { name: 'createAt' })
  createdAt: Date;
}

@InputType()
export class CreateUserInput {
  @Field({ description: 'User 이름' })
  userName: string;
  @Field({ description: 'User 이메일' })
  userEmail: string;
  @Field({ description: 'User 비밀번호' })
  password: string;
  @Field(() => Role, { description: '유저 권한' })
  role: Role;
}

@InputType()
export class UpdateUserInput {
  @Field({ description: 'User Id' })
  userId: string;
  @Field({ description: 'User 이메일' })
  userEmail: string;
  @Field({ description: 'User 이름' })
  userName: string;
  @Field({ description: 'User 비밀번호' })
  password: string;
  @Field(() => Role, { description: '유저 권한' })
  role: Role;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, {
  name: 'Role',
  description: '유저 권한 타입',
  valuesMap: {
    USER: {
      description: '일반 유저',
    },
    ADMIN: {
      description: '관리자 유저',
    },
  },
});

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

@InputType()
export class CreateUserInput {
  @Field()
  userName: string;
  @Field()
  userEmail: string;
  @Field()
  password: string;
  @Field((type) => Role)
  role: Role;
}

@InputType()
export class UpdateUserInput {
  @Field()
  userId: string;
  @Field()
  userEmail: string;
  @Field()
  userName: string;
  @Field()
  password: string;
  @Field((type) => Role)
  role: Role;
}

@ObjectType()
export class UserDto {
  @Field({ name: 'userId' })
  id: string;
  @Field({ name: 'userName' })
  userName: string;
  @Field()
  role: Role;
  @Field((type) => Date, { name: 'createAt' })
  createdAt: Date;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, {
  name: 'Role',
});

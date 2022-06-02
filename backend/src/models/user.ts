import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ name: 'userId' })
  user_id: string;
  @Field({ name: 'userName' })
  user_name: string;
  @Field()
  role: Role;
  @Field((type) => Date, { name: 'createAt' })
  created_at: Date;
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

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, {
  name: 'Role',
});

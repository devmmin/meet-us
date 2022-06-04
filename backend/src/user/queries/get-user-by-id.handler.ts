import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '@user/repository/user.repository';

export class GetUserByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(query: GetUserByIdQuery) {
    const user = await this.userRepository.findUserById(query.id);
    if (!user) {
      throw new NotFoundException('해당 id에 존재하는 User가 없습니다');
    }
    return user;
  }
}

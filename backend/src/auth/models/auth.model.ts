import { AggregateRoot } from '@nestjs/cqrs';
import { User } from '@prisma/client';

export class Authority extends AggregateRoot {
  constructor(public readonly user: User) {
    super();
  }
}

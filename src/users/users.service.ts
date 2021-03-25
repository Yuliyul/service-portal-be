import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private config: ConfigService) {}

  private readonly users = [];

  async findOne(username: string): Promise<User | undefined> {
    this.users.push({
      userId: 0,
      username: this.config.get<string>('SUPERADMIN_LOGIN'),
      password: this.config.get<string>('SUPERADMIN_PASSWORD'),
    });
    return this.users.find((user) => user.username === username);
  }
}

import { Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/dtos/user/login-user.dto';

@Injectable()
export class UsersService {
  login(loginDto: LoginUserDto) {
    // Implement login logic here
  }
}

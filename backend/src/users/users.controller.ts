import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from 'src/dtos/user/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body(ValidationPipe) loginDto: LoginUserDto) {
    return this.usersService.login(loginDto);
  }
}

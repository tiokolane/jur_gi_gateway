import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './payload/LoginDto';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from './payload/RegisterDto';

@Controller()
export class AppController {
  constructor(private authService: AppService) {}

  @Post('/login')
  login(@Body() user: LoginDto) {
    const response = this.authService.login(user);
    return response;
  }
  @Post('/register')
  register(@Body() user: RegisterDto) {
    const response = this.authService.register(user);
    return response;
  }
}

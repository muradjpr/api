import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';
import { CurrentUserGuard } from './current-user.guard';
import { CurrentUser } from './custom-decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/loginDto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // to create user
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  // login  user
  @Post('login')
  async userLogin(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { user, token } = await this.userService.login(loginDto);
    res.cookie('IsAuthenticated', true, { maxAge: 60 * 60 * 1000 });
    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    return res.send({ success: true, user, token });
  }
  // to check auth Status

  @Get('auth-status')
  @UseGuards(CurrentUserGuard)
  authStatus(@CurrentUser() user: User) {
    return { success: !!user, user };
  }

  // to logout
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('Authentication');
    res.clearCookie('isAuthenticated');
    return res.status(200).send({ success: true });
  }

  @Get()
  getusers() {
    return this.userService.getUsers();
  }
}

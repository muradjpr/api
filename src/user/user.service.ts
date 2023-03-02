import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/loginDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const user = await this.repo.findOneBy({ email });
    if (!user) {
      // create user
      const newUser = new User();
      Object.assign(newUser, createUserDto);
      this.repo.create(newUser);
      await this.repo.save(newUser);
      return newUser;
    } else {
      throw new BadRequestException(
        'User already exists, Please try with another email!',
      );
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: loginDto.email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Bad Credentials! - email');
    } else {
      if (await this.verifyPassword(loginDto.password, user.password)) {
        const token = await this.jwtService.signAsync({
          id: user.id,
          email: user.email,
          name: user.name,
        });
        delete user.password;
        return { user, token };
      } else {
        throw new UnauthorizedException('Bad Credentials! -password');
      }
    }
  }

  async getUsers() {
    return await this.repo.find();
  }

  async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

import { BadRequestException, UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
        super({
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET,
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
                return req?.cookies?.Authentication;
            }])
        })
    }

    async validate(payload: any, req: Request) {
        if(!payload) {
            throw new UnauthorizedException('payload not found!')
        } else {
            const user = await this.repo.findOneBy({email: payload.email});
            if(!user) {
                throw new UnauthorizedException("User not found!")
            } else {
                req.user = user;
                return req.user;
            }
        }
    }
}
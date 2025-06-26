import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ){}
    async create(user:CreateUserDto):Promise<User> {
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)
        const newUser = this.userRepo.save(user)
        return newUser
    }

    async findByEmail(email:string):Promise<User | null> {
        const user =  await this.userRepo.findOneBy({
            email: email
        })
        return user;
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.userRepo.findOneBy({
            id: id
        });
        return user;
    }

    async updateTwoFactorSecret(userId: number, secret: string, enabled: boolean): Promise<UpdateResult> {
        return await this.userRepo.update({
            id: userId
        }, { 
            twoFactorSecret: secret ,
            enable2Factor: enabled
        });
    }
}

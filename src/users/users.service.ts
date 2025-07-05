import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ){}
    async create(userDto:CreateUserDto):Promise<User> {
        const user = new User();
        user.firstName = userDto.firstName;
        user.lastName = userDto.lastName;
        user.email = userDto.email;
        user.apiKey = uuidv4(); // Generate a unique API key

        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(userDto.password, salt)
        const newUser = await this.userRepo.save(user)
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

    async updateTwoFactorSecret(userId: number, secret: string | null, enabled: boolean): Promise<UpdateResult> {
        const data: {enable2Factor: boolean, twoFactorSecret?: string} = { 
            enable2Factor: enabled 
        }
        secret ? data.twoFactorSecret = secret : null;
        return await this.userRepo.update({
            id: userId
        }, data);
    }

    async findByApiKey(apiKey: string): Promise<User | null> {
        const user = await this.userRepo.findOneBy({
            apiKey: apiKey
        });
        return user;
    }
}

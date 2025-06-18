import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
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
}

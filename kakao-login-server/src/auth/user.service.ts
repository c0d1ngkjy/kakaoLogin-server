import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserAuthority } from "src/domain/user-authority.entity";
import { User } from "src/domain/user.entity";
import { FindOneOptions, Repository } from "typeorm";
import { RoleType } from "./role-type";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserAuthority)
        private userAuthorityRepository: Repository<UserAuthority>,
    ){}
    
    async findByFields(options: FindOneOptions<User>): Promise<User | undefined> {
        return await this.userRepository.findOne(options);
    }
    
    async registerUser(user: User): Promise<User> {
        const registeredUser = await this.save(user);
        if(registeredUser){
            await this.saveAuthority(registeredUser.id);
        } else {
            throw new HttpException('User Register Error!', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return registeredUser
    }
    
    async save(user: User): Promise<User | undefined> {
        return await this.userRepository.save(user);
    }
    
    async saveAuthority(id: number): Promise<UserAuthority | undefined> {
        let userAuth = new UserAuthority();
        userAuth.userId = id;
        userAuth.authorityName = RoleType.USER;
        return await this.userAuthorityRepository.save(userAuth);
    } 
}
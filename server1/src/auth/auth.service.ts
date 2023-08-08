import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
   private logger  = new Logger('AuthService');
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
     ){}

     private async hashPassword(password: string, salt: string): Promise<string> {
      return bcrypt.hash(password, salt);
     }

     async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        console.log(user.password);
        
        try{
         await this.usersRepository.save(user);
        } catch(error){
            if(error.code ==='23505' ){
               throw new ConflictException('Username already exist!');
            }else {
               throw new InternalServerErrorException();
            }
        }
     }

     async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
      const username = await this.validateUserPassword(authCredentialsDto);
      
      if (!username) {
         throw new UnauthorizedException('Invalid Credentials')
      }

      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };

     }

     async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
         const { username, password } = authCredentialsDto;
         const user = await this.usersRepository.findOneBy({ username: username });

         if (user && await user.validatePassword(password)) {
            return user.username;
         } else {
            return null;
         }
            
     }
}
 
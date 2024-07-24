import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { encryptoPassword } from './util/bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService
    ){}
   
  async createUser(User: CreateUserDto){

        try {
            const {fullName, email, password} = await User;

            //Hassh Password
            const passwordHashed = await encryptoPassword(password);

            //Create: User
            const userCreated = await this.prisma.user.create({
                data: {
                    fullName: fullName,
                    email: email,
                    password: passwordHashed,
                }
            })

            //Create Toke: Jwt
            
            return "User was successfully created";
        } catch (error) {
            console.log(error.message);
            
            throw new HttpException("There is an error: Creating User", HttpStatus.BAD_REQUEST);
        }
    }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { loginPostApi, userByEmailGetApi, userByIdDeletedApi, userByIdGetAPI, userByIdPatchApi, usersGetApi } from 'src/docs/user-api/idex';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @loginPostApi()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @usersGetApi()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get(':id')
  @userByIdGetAPI()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @userByIdPatchApi()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @userByIdDeletedApi()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get('findUser/:email')
  @userByEmailGetApi()
  findUser(@Param('email') email: string) {
    return this.userService.getCurrentUser(email);
  }
}

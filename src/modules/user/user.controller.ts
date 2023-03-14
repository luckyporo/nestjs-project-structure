import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { Public } from '../../common';
import type { UserModel } from './user.model';

import { UserService } from './user.service';

@Public()
@Controller('user')
export class UserController {
  constructor(private sampleService: UserService) {}

  @Get('/') // http://localhost:3000/sample/user
  public async getUser(@Query('name') name: string): Promise<UserModel> {
    return this.sampleService.getUserByName(name);
  }

  @Post('/')
  public async addUser(@Body('name') name: string): Promise<UserModel> {
    return this.sampleService.addUser(name);
  }

  @Put('/')
  public async updateUser(@Body('id') id: number, @Body('name') name: string): Promise<UserModel> {
    return this.sampleService.updateUser(id, name);
  }

  @Delete('/')
  public async deleteUser(@Body('id') id: number): Promise<UserModel> {
    return this.sampleService.deleteUser(id);
  }
}

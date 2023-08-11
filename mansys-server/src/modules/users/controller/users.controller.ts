import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller({ path: '/users' })
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    return this.userService.remove(id);
  }
}

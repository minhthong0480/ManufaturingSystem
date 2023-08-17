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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { Roles } from '../../../common/role.decorator';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller({ path: '/users' })
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  findWithFilder(@Query() query) {
    return this.userService.findWithFilter(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiBody({ type: CreateUserDto })
  async create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @ApiParam({ name: 'id', required: true })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deactivate(@Param('id', ParseIntPipe) id) {
    return await this.userService.deactivate(id);
  }

  @Get('/seed/:total')
  seedUsers(@Param('total', ParseIntPipe) total) {
    return this.userService.seedUsers(total);
  }

  @Delete('/seed/all/')
  deleteSeedUsers() {
    return this.userService.deleteAllUsers();
  }
}

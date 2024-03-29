import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomersService } from '../sevices/customers.service';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto as UpdateCustomerDto } from '../dtos/update-customer.dto';
import { ApiBearerAuth, ApiTags, ApiParam } from "@nestjs/swagger";

@ApiTags('customers')
@ApiBearerAuth()
@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}

    @Get('/getAll')
    async getAll() {
        return await this.customersService.getAll();
    }

    @Get('/:id')
    async getOne(@Param('id') id: string) {
        return await this.customersService.findOne(parseInt(id));
    }

    @Post()
    async create(@Body() body: CreateCustomerDto) {
        return await this.customersService.createCustomer(body);
    }


    @Patch("/:id")
    async update(@Param('id') id: string ,@Body() body: UpdateCustomerDto) {
        return await this.customersService.updateCustomer(parseInt(id),body);
    }


    @Delete("/:id")
    async deactive(@Param('id') id: string) {
        return await this.customersService.deactiveCustomer(parseInt(id));
    }

}

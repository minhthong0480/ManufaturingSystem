import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";
export class PaginationRequestModel {
    @ApiProperty()
    @IsNotEmpty()
    page : number;

    @IsNotEmpty()
    @ApiProperty()
    pageSize: number;


    public applyDefaultPaginationSetting(){
        this.page = this.page <= 0 ? 1 : this.page;
        this.pageSize = this.pageSize <= 0 ? 10 : this.pageSize;
    }
}
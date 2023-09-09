import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class PaginationRequestModel {
  @ApiProperty()
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  @ApiProperty()
  pageSize: number;

  public static applyDefaultPaginationSetting(request : PaginationRequestModel) {
    request.page = request.page <= 0 ? 1 : request.page;
    request.pageSize = request.pageSize <= 0 ? 10 : request.pageSize;
  }
}
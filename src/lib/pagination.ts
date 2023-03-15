import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean } from 'class-validator';

export interface IPaginationOptions {
  page: number;
  limit: number;
}

export class PaginationResultDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @IsBoolean()
  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor(data: T[], hasNextPage: boolean) {
    this.data = data;
    this.hasNextPage = hasNextPage;
  }
}

export const infinityPagination = <T>(data: T[], options: IPaginationOptions): PaginationResultDto<T> => {
  const hasNextPage = data.length === options.limit;
  return new PaginationResultDto(data, hasNextPage);
};

import { IsDate, IsOptional } from 'class-validator';

export class DateRange {
  @IsOptional()
  @IsDate()
  fromDate: Date;

  @IsOptional()
  @IsDate()
  toDate: Date;
}

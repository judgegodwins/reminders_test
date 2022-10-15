import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReminderRequest {
  @IsNumber()
  user: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  date: string;
}

export class GetReminderRequest {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  user?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  after?: number;
}
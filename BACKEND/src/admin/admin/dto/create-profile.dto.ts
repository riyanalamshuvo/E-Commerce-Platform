import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminProfileDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

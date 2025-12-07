import { IsNotEmpty, IsString, Matches, IsOptional, IsUrl, IsDateString, IsEmail } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name should not contain numbers' })
  name: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  @Matches(/[@#$&]/, { message: 'Password must contain at least one special character (@, #, $, &)' })
  password: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsDateString({}, { message: 'createdAt must be a valid ISO date string' })
  createdAt?: string;

  @IsOptional()
  @IsUrl({}, { message: 'invalid URL' })
  linkedIn?: string;

  @IsOptional()
  @IsUrl({}, { message: 'invalid URL' })
  facebook?: string;

  @IsOptional()
  @IsUrl({}, { message: 'invalid URL' })
  twitter?: string;
}

import { IsEmail, IsOptional, IsString, Length, Matches, IsBoolean } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  username?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z0-9\s]+$/, { message: 'Name must not contain special characters' })
  @Length(1, 150)
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 100, { message: 'Password must be at least 6 characters' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  password?: string;

  @IsOptional()
  @IsString()
  @Matches(/^01\d{9}$/, { message: 'Phone number must start with 01 and be 11 digits' })
  phone?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

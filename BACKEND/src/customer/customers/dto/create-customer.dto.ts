import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  username: string;

  // fullName: must not contain special characters (only letters, numbers and spaces)
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9\s]+$/, { message: 'Name must not contain special characters' })
  @Length(1, 150)
  fullName: string;

  @IsEmail()
  email: string;

  // password rules: at least 6 chars and contains at least one lowercase letter
  @IsString()
  @IsNotEmpty()
  @Length(6, 100, { message: 'Password must be at least 6 characters' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  password: string;

  // phone must start with 01 and followed by 9 digits (Bangladesh style 11-digit number)
  @IsString()
  @IsNotEmpty()
  @Matches(/^01\d{9}$/, { message: 'Phone number must start with 01 and be 11 digits' })
  phone: string;

  @IsOptional()
  isActive?: boolean;
}

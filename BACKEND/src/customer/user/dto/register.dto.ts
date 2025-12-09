import {
  IsString,
  IsNotEmpty,
  Length,
  Matches,
  IsEmail,
  IsOptional,
  IsInt,
  Min,
  IsIn,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'fullName must not contain special characters',
  })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  password: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
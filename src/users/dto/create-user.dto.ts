import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  hometown?: string;

  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  latestTrip?: string;

  @IsOptional()
  @IsString()
  favoriteActivity?: string;

  @IsOptional()
  @IsString()
  personalUpdate?: string;

  @IsOptional()
  @IsString()
  profilePic?: string;

  @IsOptional()
  birthday?: Date;
}

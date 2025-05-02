import { Exclude, Expose } from "class-transformer";

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  city?: string;

  @Expose()
  hometown?: string;

  @Expose()
  jobTitle?: string;

  @Expose()
  company?: string;

  @Expose()
  latestTrip?: string;

  @Expose()
  favoriteActivity?: string;

  @Expose()
  personalUpdate?: string;

  @Expose()
  profilePic?: string;

  @Expose()
  birthday?: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

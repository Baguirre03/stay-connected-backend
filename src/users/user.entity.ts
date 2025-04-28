import { Exclude } from "class-transformer";

export class UserEntity {
  id: number;
  email: string;

  @Exclude()
  password: string;

  name: string;
  city?: string;
  hometown?: string;
  jobTitle?: string;
  company?: string;
  latestTrip?: string;
  favoriteActivity?: string;
  personalUpdate?: string;
  profilePic?: string;
  birthday?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

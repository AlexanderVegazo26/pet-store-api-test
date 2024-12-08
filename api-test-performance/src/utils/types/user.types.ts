import { UserStatus } from "../enums/user.enum";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: UserStatus;
}

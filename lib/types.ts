export interface UserType {
  name: string;
  email: string;
  password: string;
  role?: string;
  image?: string;
  _id: string;
}

export interface SessionType {
  user: UserType;
  expires: number;
}

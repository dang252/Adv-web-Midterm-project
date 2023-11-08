export interface UserAccount {
  username?: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
}

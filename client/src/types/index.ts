export interface UserAccount {
  userId?: string;
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface JwtPayload {
  exp: number;
  iat: number;
  user_id: string;
}
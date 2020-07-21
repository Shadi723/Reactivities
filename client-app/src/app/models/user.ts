export interface IUser{
  userName: string,
  diplayName: string,
  token: string,
  image?: string
};

export interface IUserFromValues{
  email: string,
  password: string,
  displayName?: string,
  userName?: string
}
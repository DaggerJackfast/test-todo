export class LoginPayloadDto {
  id: string;

  accessToken: string;
  expiresIn: string;
  username: string;
  constructor(id: string, username: string, accessToken: string, expiresIn: string) {
    this.id = id;
    this.username = username;
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
  }
}

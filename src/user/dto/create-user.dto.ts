export class CreateUserDto {
  username: string;
  passwordHash: string;

  constructor(username: string, passwordHash: string) {
    this.username = username;
    this.passwordHash = passwordHash;
  }
}

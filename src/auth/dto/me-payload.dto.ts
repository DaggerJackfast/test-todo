export class MePayloadDto {
  id: string;
  username: string;
  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}

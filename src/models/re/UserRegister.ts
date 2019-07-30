export class UserRegister {
  public userName: string | null;
  public email: string | null;
  public department: number | string;

  constructor(userName: string | null, email: string | null, department: number | string) {
    this.userName = userName;
    this.email = email;
    this.department = department;
  }
}

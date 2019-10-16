export class UserInfo {
  public id: number | null;
  public description: string | null;
  public department: number | null;
  public departmentName: string | null;
  public email: string | null;
  public userName: string | null;
  public avatar: string | null;


  constructor(id: number | null, description: string | null, department: number, departmentName: string | null, email: string | null, userName: string | null, avatar: string | null) {
    this.id = id;
    this.description = description;
    this.department = department;
    this.departmentName = departmentName;
    this.email = email;
    this.userName = userName;
    this.avatar = avatar;
  }
}

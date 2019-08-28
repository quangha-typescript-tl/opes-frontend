import { UserStatus } from '@/common/RegistrationCommon';

export class UserSession {
  readonly id: number;
  readonly userName: string;
  readonly email: string;
  readonly department: number;
  readonly departmentName: string;
  readonly avatar: string;
  readonly authority: FuncAuthority;
  readonly status: UserStatus;

  constructor(res: any) {
    this.id = res.id;
    this.userName = res.userName;
    this.email = res.email;
    this.department = res.department;
    this.departmentName = res.departmentName;
    this.avatar = res.avatar;
    this.authority = new FuncAuthority(res.authority);
    this.status = res.status;
  }
}

export class FuncAuthority {
  /** admin content */
  readonly AU_1: boolean | undefined;

  constructor(authorities: number[]) {
    if (!authorities || authorities.length === 0) {
      this.AU_1 = false;
      return;
    }
    this.AU_1 = this.isAuthority(authorities, 1);
  }


  private isAuthority(authorities: number[], value: number): boolean {
    const authority: any = authorities.find(v => {
      return v === value;
    });

    return authority > 0;
  }
}

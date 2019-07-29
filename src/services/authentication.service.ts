import WebApi from '../common/interceptor/axios/WebApi'
import BaseService from '../common/interceptor/BaseService';
import ShareValueService from '@/services/shareValue.service'
import JwtDecode from 'jwt-decode';

export class AuthenticationService extends BaseService {

  private _data: any;

  constructor(props?: any) {
    super(props)
  }

  isLogin() {
      const accessToken = localStorage.getItem('access_token');
      let expire = true;

      if (!this._data && accessToken) {
        this._data = this.toAuthenticationModel(accessToken);
        expire = this.isEnableExpire();
      }

      if (!(accessToken && 0 < accessToken.length && expire)) {
        ShareValueService.removeAccessToken();
        ShareValueService.clearUserSession();
        this._data = null;
        return false;
      }

      return true;
  }

  isEnableExpire(): boolean {
    const now = Math.round(new Date().getTime() / 1000);
    return this._data && now < this._data.expire;
  }

  toAuthenticationModel(accessToken: string) {
    const decoded: any = JwtDecode(accessToken);
    return {
      id: decoded.user.id,
      userName: decoded.user.userName,
      email: decoded.user.email,
      department: decoded.user.department,
      expire: decoded.exp
    };
  }
}

const authenticationService = new AuthenticationService();
export default authenticationService;

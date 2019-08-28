import WebApi from '../common/interceptor/axios/WebApi'
import BaseService from '../common/interceptor/BaseService';
import { UserSession } from '@/models/re/UserSession';

export class ShareValueService extends BaseService {

  public userSession: any;
  constructor(props?: any) {
    super(props)
  }

  setAccessToken(access_token: string) {
    localStorage.setItem('access_token', access_token);
  }

  removeAccessToken() {
    localStorage.removeItem('access_token');
  }

  clearUserSession() {
    this.userSession = null;
  }

  getUserSession() {
    if (this.userSession) {
      return this.userSession;
    } else {
      return null;
    }
  }

  fetchUserSession() {
    return WebApi.get('/api/re/getUserSession').then(
      (res) => {
        // this.userSession = res['data']['user'];

        this.userSession = new UserSession(res['data']['user']);
        return this.userSession;
      }
    ).catch((error) => {
      return null;
    });
  }

}

const shareValueService = new ShareValueService();
export default shareValueService;

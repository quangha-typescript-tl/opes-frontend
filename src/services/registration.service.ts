import WebApi from '../common/interceptor/axios/WebApi'
import BaseService from '../common/interceptor/BaseService';

export class RegistrationService extends BaseService {
  constructor(props?: any) {
    super(props)
  }

  getListUser() {
    return WebApi.get('/api/re/getUsers');
  }

  getDepartments() {
    return WebApi.get('/api/re/getDepartments');
  }

  login(email: string, password: string) {
    return WebApi.post('/api/login', {email: email, password: password});
  }
}

const registrationService = new RegistrationService();
export default registrationService;

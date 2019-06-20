import WebApi from '../common/interceptor/axios/WebApi'
import BaseService from '../common/interceptor/BaseService';

export class RegistrationService extends BaseService {
  constructor(props?: any) {
    super(props)
  }

  getListUser() {
    return WebApi.get('/re/listUser');
  }
}

const registrationService = new RegistrationService();
export default registrationService;

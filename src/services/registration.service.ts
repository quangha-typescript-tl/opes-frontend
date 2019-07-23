import WebApi from '../common/interceptor/axios/WebApi'
import BaseService from '../common/interceptor/BaseService';
import axios from 'axios'


export class RegistrationService extends BaseService {
  constructor(props?: any) {
    super(props)
  }

  getListUser() {
    return WebApi.get('/re/listUser');
  }

  login(email: string, password: string) {

    // axios.post('/users', {
    //   email: email,
    //   lastName: 'Last name'
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    return WebApi.post('/api/login', {email: email, password: password}, {headers: {'Content-Type': 'application/json'}});
  }
}

const registrationService = new RegistrationService();
export default registrationService;

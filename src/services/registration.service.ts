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

  logout() {
    return WebApi.post('/api/logout');
  }

  updateUser(user: any) {
    return WebApi.post('/api/re/updateUser', user);
  }
  deleteUser(user: any) {
    return WebApi.post('/api/re/deleteUser', user);
  }

  changePassword(password: string, passwordConfirm: string) {
    return WebApi.post('/api/re/changePassword', {password: password, passwordConfirm: passwordConfirm});
  }

  getListDepartment() {
    return WebApi.get('/api/re/getDepartments');
  }

  updateDepartment(department: any) {
    return WebApi.post('/api/re/updateDepartment', department);
  }

  saveDepartment(department: any) {
    return WebApi.post('/api/re/addDepartment', department);

  deleteDepartment(department: any) {
    return WebApi.post('/api/re/deleteDepartment', department);
  }
}

const registrationService = new RegistrationService();
export default registrationService;

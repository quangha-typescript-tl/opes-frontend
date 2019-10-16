import WebApi from '../common/interceptor/axios/WebApi'
import BaseService from '../common/interceptor/BaseService';

export class RegistrationService extends BaseService {
  constructor(props?: any) {
    super(props)
  }

  getDetailUser(userId: string) {
    return WebApi.get('/api/re/getDetailUser/' + userId);
  }

  getListUser(conditionsSearch?: any) {
    let params = new URLSearchParams();
    params.append('name', (conditionsSearch && conditionsSearch['name']) ? conditionsSearch.name: '');
    params.append('department', (conditionsSearch && conditionsSearch['department']) ? conditionsSearch.department : '');
    params.append('status', (conditionsSearch && conditionsSearch['status'])? conditionsSearch.status : '');
    return WebApi.get('/api/re/getUsers', { params: params});
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
  uploadUserAvatar(formData: any) {
    return WebApi.post('/api/re/uploadUserAvatar', formData);
  }
  deleteUser(user: any) {
    return WebApi.post('/api/re/deleteUser', user);
  }
  setUserStatus(user: any) {
    return WebApi.post('/api/re/setUserStatus', user);
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
  }

  deleteDepartment(department: any) {
    return WebApi.post('/api/re/deleteDepartment', department);
  }

  addUsers(model: any) {
    return WebApi.post('/api/re/addUsers', model);
  }
}

const registrationService = new RegistrationService();
export default registrationService;

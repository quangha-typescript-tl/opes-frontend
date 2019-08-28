import WebApi from '../common/interceptor/axios/WebApi'
import BaseService from '../common/interceptor/BaseService';

export class ContentService extends BaseService {
  constructor(props?: any) {
    super(props)
  }

  getListContent() {
    return WebApi.get('/api/co/getContents');
  }
  addContent(model: any) {
    return WebApi.post('/api/co/addContent', model);
  }
  editContent(model: any) {
    return WebApi.post('/api/co/editContent', model);
  }

  deleteContent(model: any) {
    return WebApi.post('/api/co/deleteContent', model);
  }

  uploadImageContent(formData: any) {
    return WebApi.post('/api/co/uploadImageContent', formData);
  }

  getDetailContent(contentId: string) {
    return WebApi.get('/api/co/getDetailContent/' + contentId);
  }

  getTopContentRelated(model: any) {
    let params = new URLSearchParams();
    params.append('contentId', model.contentId);
    return WebApi.get('/api/co/getTopContentRelated', {params: params});
  }

  getListHashTag(model: any) {
    let params = new URLSearchParams();
    params.append('hashTag', model.hashTag);
    return WebApi.get('/api/co/getListHashTag', {params: params});
  }
}

const contentService = new ContentService();
export default contentService;

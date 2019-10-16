import WebApi from '../common/interceptor/axios/WebApi'
import BaseService from '../common/interceptor/BaseService';

export class ContentService extends BaseService {
  constructor(props?: any) {
    super(props)
  }

  getListContent(conditionSearch?: any) {
    let params = new URLSearchParams();
    params.append('hash_tag', conditionSearch ? conditionSearch.hash_tag : []);
    params.append('typeDatePost', conditionSearch ? conditionSearch.typeDatePost : '');
    params.append('dateStart', conditionSearch ? conditionSearch.dateStart : '');
    params.append('dateEnd', conditionSearch ? conditionSearch.dateEnd : '');
    return WebApi.get('/api/co/getContents', {params: params});
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

  removeImageContent(imageUrl: string) {
    const data = {
      imageUrl: imageUrl
    };
    return WebApi.post('/api/co/removeImageContent', data);
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

  getDetailContentUser(conditionsSearch: any) {
    let params = new URLSearchParams();
    params.append('userId', conditionsSearch.userId);
    params.append('hashTag', conditionsSearch.hashTag);
    params.append('page', conditionsSearch.page);
    params.append('size', conditionsSearch.size);
    return WebApi.get('/api/co/getDetailContentUser', {params: params});
  }
}

const contentService = new ContentService();
export default contentService;

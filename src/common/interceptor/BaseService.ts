export default class BaseService {
  selectCustomer: any;
  appCustomer: any;

  constructor(props?: any) {
    // this.selectCustomer = (props && props.customer) ? props.customer : process.env.VUE_APP_CUSTOMER_ID
    // this.appCustomer = process.env.VUE_APP_CUSTOMER_ID
    this.selectCustomer = '';
    this.appCustomer = '';
  }

  setCustomer(customer: any) {
    this.selectCustomer = customer
  }

  makeUrl(url: string, params: any) {
    if (params) {
      Object.keys(params).map(param => {
        url = url.replace(':' + param, params[param])
      })
    }

    return url
  }
}

import { Subject } from 'rxjs'

export class DialogService {
  public showLoader: Subject<boolean> = new Subject();

  public setLoaderVisible(flag: boolean) {
    this.showLoader.next(flag);
  }

  // public isLoaderVisible() {
  //   // return this.showLoader;
  // }
}

const dialogService = new DialogService();
export default dialogService;

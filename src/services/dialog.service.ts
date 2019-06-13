export class DialogService {
  BUTTON_COLOR = '#EF8B00';
  private delaySec = 0;
  private showLoader = false;

  public setLoaderVisible(flag: boolean) {
    this.showLoader = flag;
  }

  public isLoaderVisible() {
    return this.showLoader;
  }
}

import {Subject, Observable, forkJoin} from 'rxjs';
import { DialogResult, DialogParams } from '@/models/DialogParams'

export class DialogService {
  public showLoader: Subject<boolean> = new Subject();
  public showModalPopup: Subject<DialogParams> = new Subject();

  public setLoaderVisible(flag: boolean) {
    this.showLoader.next(flag);
  }

  showSuccess(message: string, buttonOk: string) {
    return this.showMessage('success', false, null, message, null, buttonOk, null, null, null);
  }

  showError(message: string, buttonOk: string) {
    return this.showMessage('error', false, null, message, null, buttonOk, null, null, null);
  }

  showMessage(icon: string, closeButton: boolean, title: string | null, message: string, html: string | null, positiveButton: string, negativeButton: string | null, size: string | null, otherButton: string| null) {
    return this.showModal(icon, closeButton, title, message, html, positiveButton, negativeButton, null, {}, null, size, otherButton);
  }

  public showModal(icon: string, closeButton: boolean, title: string | null, message: string | null, html: string | null, positiveButton: string | null, negativeButton: string | null,
                  component: any, extraParams: any, type: string | null, size: string | null, otherButton?: string | null | undefined) {
    const blank = new Subject<string>();
    const subject = new Subject<DialogResult>();

    const dialog = new DialogParams(
      component,
      icon,
      closeButton,
      title,
      message,
      html,
      positiveButton,
      negativeButton,
      subject,
      extraParams,
      type,
      size,
      otherButton
    );
    this.showModalPopup.next(dialog);

    blank.next('');
    blank.complete();
    return subject;
  }
}

const dialogService = new DialogService();
export default dialogService;

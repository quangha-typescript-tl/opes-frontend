import {Subject} from 'rxjs';

export class DialogParams {
  public componentType: string;
  public icon: string;
  public closeButton: boolean;
  public title: string | null;
  public message: string | null;
  public html: string | null;
  public positiveButton: string | null;
  public negativeButton: string | null;
  public otherButton: string | null | undefined;
  public subject: Subject<DialogResult>;
  public extraParams: any;
  public type: string | null; // class name（'bootstrap'）or null(swal)
  public size: string | null; // 'modal-lg' or 'modal-sm' or null

  constructor(componentType: string, icon: string, closeButton: boolean, title: string | null, message: string | null, html: string | null,
              positiveButton: string | null, negativeButton: string | null, subject: Subject<DialogResult>, extraParams: any,
              type: string | null, size: string | null , otherButton?: string | null | undefined) {
    this.componentType = componentType;
    this.icon = icon;
    this.closeButton = closeButton;
    this.title = title;
    this.message = message;
    this.html = html;
    this.positiveButton = positiveButton;
    this.negativeButton = negativeButton;
    this.otherButton = otherButton;
    this.subject = subject;
    this.extraParams = extraParams;
    this.type = type;
    this.size = size;
  }
}

export class DialogResult {
  public buttonName: string;
  public payload: any;

  constructor(buttonName: string, payload: any) {
    this.buttonName = buttonName;
    this.payload = payload;
  }

  isOk() {
    return this.buttonName === 'ok';
  }

  isCancel() {
    return this.buttonName === 'cancel';
  }

  isOther() {
    return this.buttonName === 'other';
  }
}

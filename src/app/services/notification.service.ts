import { Injectable, inject } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _snackBar = inject(MatSnackBar);

  constructor() { }

  public showNotification(message: string): void {
    this._snackBar.open(message, 'Close', { duration: 3000 } as MatSnackBarConfig);
  }
}

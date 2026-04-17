import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showNotification', () => {
    it('should open the snack bar with the given message and a duration of 3000ms', () => {
      const openSpy = spyOn(snackBar, 'open');

      service.showNotification('Test message');

      expect(openSpy).toHaveBeenCalledTimes(1);
      const [message, , config] = openSpy.calls.mostRecent().args;
      expect(message).toBe('Test message');
      expect((config as any).duration).toBe(3000);
    });
  });
});

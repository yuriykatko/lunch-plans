import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AppComponent } from './app.component';
import { LocaleListComponent } from './components/locale-list/locale-list.component';

describe('AppComponent', () => {
  let titleSpy: { setTitle: ReturnType<typeof vi.fn> };
  let bottomSheetSpy: { open: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    titleSpy = { setTitle: vi.fn() };
    bottomSheetSpy = { open: vi.fn() };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: Title, useValue: titleSpy },
        { provide: MatBottomSheet, useValue: bottomSheetSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set the page title on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // triggers ngOnInit

    expect(titleSpy.setTitle).toHaveBeenCalledTimes(1);
  });

  describe('setLocaleLabel', () => {
    it('should return "English" for undefined locale', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.setLocaleLabel(undefined)).toBe('English');
    });

    it('should return "English" for en-US locale', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.setLocaleLabel('en-US')).toBe('English');
    });

    it('should return "Español" for es locale', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.setLocaleLabel('es')).toBe('Español');
    });
  });

  describe('openBottomSheet', () => {
    it('should open the bottom sheet with LocaleListComponent', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      app.openBottomSheet();

      expect(bottomSheetSpy.open).toHaveBeenCalledTimes(1);
      expect(bottomSheetSpy.open.mock.lastCall![0]).toBe(LocaleListComponent as any);
    });
  });
});

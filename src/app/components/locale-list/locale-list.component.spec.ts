import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { LocaleListComponent } from './locale-list.component';

describe('LocaleListComponent', () => {
  let component: LocaleListComponent;
  let fixture: ComponentFixture<LocaleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocaleListComponent],
      imports: [MatListModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LocaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isCurrentLocale', () => {
    it('should return true when the locale matches $localize.locale', () => {
      const current = $localize.locale || 'en-US';
      expect(component.isCurrentLocale(current)).toBeTrue();
    });

    it('should return false for a non-matching locale', () => {
      expect(component.isCurrentLocale('xx-FAKE')).toBeFalse();
    });
  });
});

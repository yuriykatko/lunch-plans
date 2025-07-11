import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleListComponent } from './locale-list.component';

describe('LocaleListComponent', () => {
  let component: LocaleListComponent;
  let fixture: ComponentFixture<LocaleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocaleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

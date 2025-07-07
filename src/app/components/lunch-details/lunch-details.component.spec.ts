import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchDetailsComponent } from './lunch-details.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LunchDetailsComponent', () => {
  let component: LunchDetailsComponent;
  let fixture: ComponentFixture<LunchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [LunchDetailsComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

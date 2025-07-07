import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaGeneratorComponent } from './idea-generator.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('IdeaGeneratorComponent', () => {
  let component: IdeaGeneratorComponent;
  let fixture: ComponentFixture<IdeaGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [IdeaGeneratorComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

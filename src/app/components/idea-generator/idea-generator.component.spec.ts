import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { IdeaGeneratorComponent } from './idea-generator.component';
import { MealService } from '../../services/meal.service';

describe('IdeaGeneratorComponent', () => {
  let component: IdeaGeneratorComponent;
  let fixture: ComponentFixture<IdeaGeneratorComponent>;
  let mealServiceSpy: jasmine.SpyObj<MealService>;

  beforeEach(async () => {
    mealServiceSpy = jasmine.createSpyObj('MealService', ['generateLunchIdea']);

    await TestBed.configureTestingModule({
      declarations: [IdeaGeneratorComponent],
      providers: [
        { provide: MealService, useValue: mealServiceSpy },
      ],
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

  it('should call generateLunchIdea after debounce when getLunchIdea is called', fakeAsync(() => {
    component.getLunchIdea();
    expect(mealServiceSpy.generateLunchIdea).not.toHaveBeenCalled();

    tick(250);
    expect(mealServiceSpy.generateLunchIdea).toHaveBeenCalledTimes(1);
  }));

  it('should debounce rapid clicks into a single service call', fakeAsync(() => {
    component.getLunchIdea();
    component.getLunchIdea();
    component.getLunchIdea();

    tick(250);
    expect(mealServiceSpy.generateLunchIdea).toHaveBeenCalledTimes(1);
  }));

  it('should allow a second call after the debounce window', fakeAsync(() => {
    component.getLunchIdea();
    tick(250);

    component.getLunchIdea();
    tick(250);

    expect(mealServiceSpy.generateLunchIdea).toHaveBeenCalledTimes(2);
  }));
});

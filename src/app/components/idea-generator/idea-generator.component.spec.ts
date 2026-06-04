import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaGeneratorComponent } from './idea-generator.component';
import { MealService } from '../../services/meal.service';

describe('IdeaGeneratorComponent', () => {
  let component: IdeaGeneratorComponent;
  let fixture: ComponentFixture<IdeaGeneratorComponent>;
  let mealServiceSpy: { generateLunchIdea: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mealServiceSpy = { generateLunchIdea: vi.fn() };

    await TestBed.configureTestingModule({
      declarations: [IdeaGeneratorComponent],
      providers: [
        { provide: MealService, useValue: mealServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    vi.useFakeTimers();
    fixture = TestBed.createComponent(IdeaGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateLunchIdea after debounce when getLunchIdea is called', () => {
    component.getLunchIdea();
    expect(mealServiceSpy.generateLunchIdea).not.toHaveBeenCalled();

    vi.advanceTimersByTime(250);
    expect(mealServiceSpy.generateLunchIdea).toHaveBeenCalledTimes(1);
  });

  it('should debounce rapid clicks into a single service call', () => {
    component.getLunchIdea();
    component.getLunchIdea();
    component.getLunchIdea();

    vi.advanceTimersByTime(250);
    expect(mealServiceSpy.generateLunchIdea).toHaveBeenCalledTimes(1);
  });

  it('should allow a second call after the debounce window', () => {
    component.getLunchIdea();
    vi.advanceTimersByTime(250);

    component.getLunchIdea();
    vi.advanceTimersByTime(250);

    expect(mealServiceSpy.generateLunchIdea).toHaveBeenCalledTimes(2);
  });
});

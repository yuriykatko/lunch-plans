import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LunchDetailsComponent } from './lunch-details.component';
import { MealService } from '../../services/meal.service';
import { Meal } from '../../models/meal';
import { DisplayMode } from '../../models/display-mode';

describe('LunchDetailsComponent', () => {
  let component: LunchDetailsComponent;
  let fixture: ComponentFixture<LunchDetailsComponent>;
  let mealServiceSpy: {
    getMeals: ReturnType<typeof vi.fn>;
    removeMeal: ReturnType<typeof vi.fn>;
    setLoaded: ReturnType<typeof vi.fn>;
    toggleDisplayMode: ReturnType<typeof vi.fn>;
  };
  let mealsSubject: BehaviorSubject<Meal[]>;

  beforeEach(async () => {
    mealsSubject = new BehaviorSubject<Meal[]>([]);
    mealServiceSpy = {
      getMeals: vi.fn().mockReturnValue(mealsSubject.asObservable()),
      removeMeal: vi.fn(),
      setLoaded: vi.fn(),
      toggleDisplayMode: vi.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [LunchDetailsComponent],
      providers: [
        { provide: MealService, useValue: mealServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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

  it('should expose meals$ from MealService', async () => {
    const meal = { idmeal: '1', strmeal: 'Pizza', displayMode: DisplayMode.Image } as Meal;
    mealsSubject.next([meal]);

    const meals = await new Promise<Meal[]>(resolve => {
      component.meals$.subscribe(m => resolve(m));
    });
    expect(meals.length).toBe(1);
    expect(meals[0].strmeal).toBe('Pizza');
  });

  it('should delegate remove to MealService.removeMeal', () => {
    component.remove('42');
    expect(mealServiceSpy.removeMeal).toHaveBeenCalledWith('42');
  });

  it('should delegate toggleMode to MealService.toggleDisplayMode', () => {
    component.toggleMode('42');
    expect(mealServiceSpy.toggleDisplayMode).toHaveBeenCalledWith('42');
  });

  it('should delegate imageLoaded to MealService.setLoaded', () => {
    component.imageLoaded('42');
    expect(mealServiceSpy.setLoaded).toHaveBeenCalledWith('42');
  });
});

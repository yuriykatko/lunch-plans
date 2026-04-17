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
  let mealServiceSpy: jasmine.SpyObj<MealService>;
  let mealsSubject: BehaviorSubject<Meal[]>;

  beforeEach(async () => {
    mealsSubject = new BehaviorSubject<Meal[]>([]);
    mealServiceSpy = jasmine.createSpyObj('MealService', [
      'getMeals', 'removeMeal', 'setLoaded', 'toggleDisplayMode',
    ]);
    mealServiceSpy.getMeals.and.returnValue(mealsSubject.asObservable());

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

  it('should expose meals$ from MealService', (done) => {
    const meal = { idmeal: '1', strmeal: 'Pizza', displayMode: DisplayMode.Image } as Meal;
    mealsSubject.next([meal]);

    component.meals$.subscribe(meals => {
      expect(meals.length).toBe(1);
      expect(meals[0].strmeal).toBe('Pizza');
      done();
    });
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

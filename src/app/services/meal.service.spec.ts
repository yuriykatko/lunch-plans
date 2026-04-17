import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MealService } from './meal.service';
import { NotificationService } from './notification.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DisplayMode } from '../models/display-mode';
import { Meal } from '../models/meal';
import { environment } from '../../environments/environment';

function makeMealResponse(overrides: Partial<Meal> = {}): Meal {
  return {
    idmeal: '1',
    strmeal: 'Test Meal',
    strmealthumb: 'http://example.com/img.jpg',
    strinstructions: 'Cook it',
    strsource: 'http://example.com',
    searchurl: '',
    strarea: 'American',
    strcategory: 'Lunch',
    ingredients: [],
    isLoading: false,
    displayMode: DisplayMode.Image,
    stringredient1: 'Salt',
    strmeasure1: '1 tsp',
    stringredient2: 'Pepper',
    strmeasure2: '2 tsp',
    stringredient3: '',
    strmeasure3: '',
    ...overrides,
  } as Meal;
}

describe('MealService', () => {
  let service: MealService;
  let httpMock: HttpTestingController;
  let notificationSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    notificationSpy = jasmine.createSpyObj('NotificationService', ['showNotification']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: NotificationService, useValue: notificationSpy },
      ],
    });
    service = TestBed.inject(MealService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMeals', () => {
    it('should return an observable with an empty array initially', () => {
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));
      expect(meals).toEqual([]);
    });
  });

  describe('generateLunchIdea', () => {
    it('should fetch a meal and prepend it to the meals list', () => {
      const mockMeal = makeMealResponse();
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      const req = httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMeal);

      expect(meals.length).toBe(1);
      expect(meals[0].strmeal).toBe('Test Meal');
    });

    it('should set isLoading to true on the new meal', () => {
      const mockMeal = makeMealResponse();
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(mockMeal);

      expect(meals[0].isLoading).toBeTrue();
    });

    it('should set displayMode to Image on the new meal', () => {
      const mockMeal = makeMealResponse();
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(mockMeal);

      expect(meals[0].displayMode).toBe(DisplayMode.Image);
    });

    it('should generate a search URL from the meal name', () => {
      const mockMeal = makeMealResponse({ strmeal: 'Chicken Curry' });
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(mockMeal);

      expect(meals[0].searchurl).toBe('https://www.google.com/search?q=order+online+Chicken+Curry');
    });

    it('should populate ingredients from the meal response', () => {
      const mockMeal = makeMealResponse();
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(mockMeal);

      expect(meals[0].ingredients.length).toBe(2);
      expect(meals[0].ingredients[0]).toEqual({ name: 'Salt', quantity: '1 tsp' });
      expect(meals[0].ingredients[1]).toEqual({ name: 'Pepper', quantity: '2 tsp' });
    });

    it('should prepend new meals (most recent first)', () => {
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(makeMealResponse({ idmeal: '1', strmeal: 'First' }));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(makeMealResponse({ idmeal: '2', strmeal: 'Second' }));

      expect(meals.length).toBe(2);
      expect(meals[0].strmeal).toBe('Second');
      expect(meals[1].strmeal).toBe('First');
    });

    it('should show a notification and not add a meal on HTTP error', () => {
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock
        .expectOne(`${environment.apiUrl}/api/random-from-db`)
        .flush('Server error', { status: 500, statusText: 'Internal Server Error' });

      expect(meals.length).toBe(0);
      expect(notificationSpy.showNotification).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeMeal', () => {
    it('should remove the meal with the given id', () => {
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(makeMealResponse({ idmeal: '1' }));
      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(makeMealResponse({ idmeal: '2' }));

      service.removeMeal('1');

      expect(meals.length).toBe(1);
      expect(meals[0].idmeal).toBe('2');
    });

    it('should show a notification after removing', () => {
      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(makeMealResponse({ idmeal: '1' }));

      service.removeMeal('1');

      expect(notificationSpy.showNotification).toHaveBeenCalledTimes(1);
    });

    it('should not break when removing a non-existent id', () => {
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(makeMealResponse({ idmeal: '1' }));

      service.removeMeal('nonexistent');

      expect(meals.length).toBe(1);
    });
  });

  describe('setLoaded', () => {
    it('should set isLoading to false for the given meal', () => {
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(makeMealResponse({ idmeal: '1' }));
      expect(meals[0].isLoading).toBeTrue();

      service.setLoaded('1');

      expect(meals[0].isLoading).toBeFalse();
    });

    it('should not break when id does not exist', () => {
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(makeMealResponse({ idmeal: '1' }));

      service.setLoaded('nonexistent');

      expect(meals[0].isLoading).toBeTrue();
    });
  });

  describe('toggleDisplayMode', () => {
    it('should toggle from Image to Ingredients', () => {
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(makeMealResponse({ idmeal: '1' }));
      expect(meals[0].displayMode).toBe(DisplayMode.Image);

      service.toggleDisplayMode('1');

      expect(meals[0].displayMode).toBe(DisplayMode.Ingredients);
    });

    it('should toggle from Ingredients back to Image', () => {
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      service.generateLunchIdea();
      httpMock.expectOne(`${environment.apiUrl}/api/random-from-db`).flush(makeMealResponse({ idmeal: '1' }));

      service.toggleDisplayMode('1');
      service.toggleDisplayMode('1');

      expect(meals[0].displayMode).toBe(DisplayMode.Image);
    });

    it('should not break when meal id does not exist', () => {
      let meals: Meal[] = [];
      service.getMeals().subscribe(m => (meals = m));

      expect(() => service.toggleDisplayMode('nonexistent')).not.toThrow();
      expect(meals.length).toBe(0);
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsComponent } from './ingredients.component';

describe('IngredientsComponent', () => {
  let component: IngredientsComponent;
  let fixture: ComponentFixture<IngredientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsComponent],
    });
    fixture = TestBed.createComponent(IngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty ingredients array by default', () => {
    expect(component.ingredients).toEqual([]);
  });

  it('should render ingredients in the template', () => {
    fixture = TestBed.createComponent(IngredientsComponent);
    component = fixture.componentInstance;
    component.ingredients = [
      { name: 'Salt', quantity: '1 tsp' },
      { name: 'Pepper', quantity: '2 tsp' },
    ];
    fixture.detectChanges();

    const listItems = fixture.nativeElement.querySelectorAll('li');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain('Salt');
    expect(listItems[0].textContent).toContain('1 tsp');
    expect(listItems[1].textContent).toContain('Pepper');
  });

  it('should render no list items when ingredients is empty', () => {
    const listItems = fixture.nativeElement.querySelectorAll('li');
    expect(listItems.length).toBe(0);
  });
});

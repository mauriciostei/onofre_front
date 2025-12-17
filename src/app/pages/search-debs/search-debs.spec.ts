import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDebs } from './search-debs';

describe('SearchDebs', () => {
  let component: SearchDebs;
  let fixture: ComponentFixture<SearchDebs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDebs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDebs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

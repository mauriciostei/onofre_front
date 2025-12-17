import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDebs } from './create-debs';

describe('CreateDebs', () => {
  let component: CreateDebs;
  let fixture: ComponentFixture<CreateDebs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDebs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDebs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

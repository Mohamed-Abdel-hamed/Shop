import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArrivales } from './new-arrivales';

describe('NewArrivales', () => {
  let component: NewArrivales;
  let fixture: ComponentFixture<NewArrivales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewArrivales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewArrivales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

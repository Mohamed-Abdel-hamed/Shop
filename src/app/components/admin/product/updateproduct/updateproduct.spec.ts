import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateproduct } from './updateproduct';

describe('Updateproduct', () => {
  let component: Updateproduct;
  let fixture: ComponentFixture<Updateproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateproduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateproduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

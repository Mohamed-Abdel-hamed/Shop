import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateaccount } from './updateaccount';

describe('Updateaccount', () => {
  let component: Updateaccount;
  let fixture: ComponentFixture<Updateaccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateaccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateaccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

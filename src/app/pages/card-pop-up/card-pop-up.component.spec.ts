import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPopUpComponent } from './card-pop-up.component';

describe('CardPopUpComponent', () => {
  let component: CardPopUpComponent;
  let fixture: ComponentFixture<CardPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

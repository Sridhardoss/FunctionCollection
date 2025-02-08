import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionCollectAmountComponent } from './function-collect-amount.component';

describe('FunctionCollectAmountComponent', () => {
  let component: FunctionCollectAmountComponent;
  let fixture: ComponentFixture<FunctionCollectAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctionCollectAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionCollectAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

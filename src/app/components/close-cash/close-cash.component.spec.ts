import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseCashComponent } from './close-cash.component';

describe('CloseCashComponent', () => {
  let component: CloseCashComponent;
  let fixture: ComponentFixture<CloseCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseCashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloseCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

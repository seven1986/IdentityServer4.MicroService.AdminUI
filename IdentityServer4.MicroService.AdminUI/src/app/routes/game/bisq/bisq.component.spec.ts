import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BisqComponent } from './bisq.component';

describe('BisqComponent', () => {
  let component: BisqComponent;
  let fixture: ComponentFixture<BisqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BisqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BisqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XxlComponent } from './xxl.component';

describe('XxlComponent', () => {
  let component: XxlComponent;
  let fixture: ComponentFixture<XxlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XxlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XxlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

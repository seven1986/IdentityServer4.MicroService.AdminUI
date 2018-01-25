import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceCompareComponent } from './face-compare.component';

describe('FaceCompareComponent', () => {
  let component: FaceCompareComponent;
  let fixture: ComponentFixture<FaceCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

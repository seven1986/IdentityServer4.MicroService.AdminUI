import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiResourcesComponent } from './api-resources.component';

describe('ApiResourcesComponent', () => {
  let component: ApiResourcesComponent;
  let fixture: ComponentFixture<ApiResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityResourcesComponent } from './identity-resources.component';

describe('IdentityResourcesComponent', () => {
  let component: IdentityResourcesComponent;
  let fixture: ComponentFixture<IdentityResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

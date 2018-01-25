import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HitBossComponent } from './hit-boss.component';

describe('HitBossComponent', () => {
  let component: HitBossComponent;
  let fixture: ComponentFixture<HitBossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitBossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HitBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

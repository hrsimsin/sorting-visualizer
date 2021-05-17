import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarPanelComponent } from './bar-panel.component';

describe('BarPanelComponent', () => {
  let component: BarPanelComponent;
  let fixture: ComponentFixture<BarPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

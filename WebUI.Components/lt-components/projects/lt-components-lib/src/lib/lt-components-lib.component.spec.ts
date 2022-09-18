import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtComponentsLibComponent } from './lt-components-lib.component';

describe('LtComponentsLibComponent', () => {
  let component: LtComponentsLibComponent;
  let fixture: ComponentFixture<LtComponentsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtComponentsLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LtComponentsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardBar } from './wizard-bar.component';

describe('Step1Component', () => {
  let component: WizardBar;
  let fixture: ComponentFixture<WizardBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardBar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

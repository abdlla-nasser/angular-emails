import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPlaceHolderComponent } from './email-place-holder.component';

describe('EmailPlaceHolderComponent', () => {
  let component: EmailPlaceHolderComponent;
  let fixture: ComponentFixture<EmailPlaceHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailPlaceHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPlaceHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

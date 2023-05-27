import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMessageComponent } from './contact-message.component';

describe('ContactMessageComponent', () => {
  let component: ContactMessageComponent;
  let fixture: ComponentFixture<ContactMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

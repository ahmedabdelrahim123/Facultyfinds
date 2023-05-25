import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddedComponent } from './product-added.component';

describe('ProductAddedComponent', () => {
  let component: ProductAddedComponent;
  let fixture: ComponentFixture<ProductAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAddedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

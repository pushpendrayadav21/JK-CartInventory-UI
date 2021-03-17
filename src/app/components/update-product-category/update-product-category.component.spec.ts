import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductCategoryComponent } from './update-product-category.component';

describe('UpdateProductCategoryComponent', () => {
  let component: UpdateProductCategoryComponent;
  let fixture: ComponentFixture<UpdateProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

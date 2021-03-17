import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCategryComponent } from './search-categry.component';

describe('SearchCategryComponent', () => {
  let component: SearchCategryComponent;
  let fixture: ComponentFixture<SearchCategryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCategryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCategryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

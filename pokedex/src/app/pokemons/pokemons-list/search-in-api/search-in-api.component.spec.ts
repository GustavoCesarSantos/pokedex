import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInApiComponent } from './search-in-api.component';

describe('SearchInApiComponent', () => {
  let component: SearchInApiComponent;
  let fixture: ComponentFixture<SearchInApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSharingGroupComponent } from './create-sharing-group.component';

describe('CreateSharingGroupComponent', () => {
  let component: CreateSharingGroupComponent;
  let fixture: ComponentFixture<CreateSharingGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSharingGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSharingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

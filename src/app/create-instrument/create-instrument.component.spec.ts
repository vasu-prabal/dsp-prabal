import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateInstrumentComponent } from "./create-instrument.component";

describe("CreateInstrumentComponent", () => {
  let component: CreateInstrumentComponent;
  let fixture: ComponentFixture<CreateInstrumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateInstrumentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from "@angular/core/testing";

import { CreateInstrumentService } from "./create-instrument.service";

describe("CreateInstrumentService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CreateInstrumentService = TestBed.get(
      CreateInstrumentService
    );
    expect(service).toBeTruthy();
  });
});

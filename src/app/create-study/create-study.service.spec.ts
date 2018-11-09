import { TestBed } from "@angular/core/testing";

import { CreateStudyService } from "./create-study.service";

describe("CreateStudyService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CreateStudyService = TestBed.get(CreateStudyService);
    expect(service).toBeTruthy();
  });
});

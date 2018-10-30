import { TestBed } from "@angular/core/testing";

import { CreateProtocolService } from "./create-protocol.service";

describe("CreateProtocolService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CreateProtocolService = TestBed.get(CreateProtocolService);
    expect(service).toBeTruthy();
  });
});

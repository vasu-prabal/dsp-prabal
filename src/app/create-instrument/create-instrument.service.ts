import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, IS_LOCAL_API, LOCAL_API_URL } from "../constants";
import { appendSession } from "../common";
import { IAttributeModal } from "../instruments/instruments-modal";

@Injectable({
  providedIn: "root"
})
export class CreateInstrumentService {
  constructor(public http: HttpClient) {}

  getVendorsList() {
    let url = `${API_URL}instruments/vendors`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post<Array<IAttributeModal>>(LOCAL_API_URL, {
        url: url,
        type: "get"
      });
    } else {
      return this.http.get<Array<IAttributeModal>>(url);
    }
  }

  getInstrumentTypesByTechnologyTypeAndVendor(technologyType, vendor) {
    let url = `${API_URL}instrument-models/instrumentTypesByTechnologyTypeAndVendor`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "get",
        params: {
          technologyType: technologyType,
          vendor: vendor
        }
      });
    } else {
      return this.http.get(url, {
        params: {
          technologyType: technologyType,
          vendor: vendor
        }
      });
    }
  }
  getVendorExtensionsByTechnologyTypeAndVendor(technologyType, vendor) {
    let url = `${API_URL}instrument-models/vendorExtensionsByTechnologyTypeAndVendor`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "get",
        params: {
          technologyType: technologyType,
          vendor: vendor
        }
      });
    } else {
      return this.http.get(url, {
        params: {
          technologyType: technologyType,
          vendor: vendor
        }
      });
    }
  }
  checkInstrumentModelNameExists(modelId, vendor, name) {
    let url = `${API_URL}instrument-models/isNameUnique`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "get",
        params: {
          modelId: modelId,
          name: name,
          vendor: vendor
        }
      });
    } else {
      return this.http.get(url, {
        params: {
          modelId: modelId,
          name: name,
          vendor: vendor
        }
      });
    }
  }
  createInstrumentModel(instrumentModel) {
    let url = `${API_URL}instrument-models`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "post",
        data: instrumentModel
      });
    } else {
      return this.http.post(url, instrumentModel);
    }
  }
}

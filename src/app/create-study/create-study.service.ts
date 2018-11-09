import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, LOCAL_API_URL, IS_LOCAL_API } from "../constants";
import { appendSession } from "../common";
import { IProject } from "../home/home-modal";
import { IInstrumentModel, IInstrument, IExperimentType } from "./study-modal";
import { IAttributeModal } from "../instruments/instruments-modal";

@Injectable({
  providedIn: "root"
})
export class CreateStudyService {
  constructor(public http: HttpClient) {}

  getProjects() {
    let url = `${API_URL}projects/allowedForWriting`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post<Array<IProject>>(LOCAL_API_URL, {
        url: url,
        type: "get",
        params: { userId: undefined }
      });
    } else {
      return this.http.get<Array<IProject>>(url, {
        params: { userId: undefined }
      });
    }
  }

  getSpecies() {
    let url = `${API_URL}experiments/new/species`;
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

  getTechTypes() {
    let url = `${API_URL}instruments/studyTypes`;
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

  getVendorsList(techTypeId) {
    let url = `${API_URL}instruments/vendorsByStudyType`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post<Array<IAttributeModal>>(LOCAL_API_URL, {
        url: url,
        type: "get",
        params: { techType: techTypeId }
      });
    } else {
      return this.http.get<Array<IAttributeModal>>(url, {
        params: { techType: techTypeId }
      });
    }
  }

  checkInstrumentModalExists(species, technologyType, technologyValue, vendor) {
    let url = `${API_URL}experiments/new/instrumentModels`;
    url = appendSession(url);
    url = `${url}?species=${species}&technologyType=${technologyType}&technologyTypeValue=${technologyValue}&vendor=${vendor}`;
    if (IS_LOCAL_API) {
      return this.http.post<Array<IInstrumentModel>>(LOCAL_API_URL, {
        url: url,
        type: "get"
      });
    } else {
      return this.http.get<Array<IInstrumentModel>>(url);
    }
  }
  getInstrumentsList(vendor) {
    let url = `${API_URL}experiments/new/instruments`;
    url = appendSession(url);
    url = `${url}?instrumentModel=${vendor}`;
    if (IS_LOCAL_API) {
      return this.http.post<Array<IInstrument>>(LOCAL_API_URL, {
        url: url,
        type: "get"
      });
    } else {
      return this.http.get<Array<IInstrument>>(url);
    }
  }

  getExperimentTypes() {
    let url = `${API_URL}experiments/new/experimentTypes`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post<Array<IExperimentType>>(LOCAL_API_URL, {
        url: url,
        type: "get"
      });
    } else {
      return this.http.get<Array<IExperimentType>>(url);
    }
  }
}

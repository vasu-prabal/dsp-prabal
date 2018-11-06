import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL, LOCAL_API_URL, IS_LOCAL_API } from "../constants";
import { getToken, getHttpHeaders, appendSession } from "../common";
import {
  ISpeciesList,
  ITechTypes,
  IVendorList,
  IProject
} from "../home/home-modal";

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
        params: { userId: undefined },
        headers: getHttpHeaders()
      });
    }
  }

  getSpecies() {
    let url = `${API_URL}experiments/new/species`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post<Array<ISpeciesList>>(LOCAL_API_URL, {
        url: url,
        type: "get"
      });
    } else {
      return this.http.get<Array<ISpeciesList>>(url, { headers: getHttpHeaders() });
    }
  }

  getTechTypes() {
    let url = `${API_URL}instruments/studyTypes`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post<Array<ITechTypes>>(LOCAL_API_URL, {
        url: url,
        type: "get"
      });
    } else {
      return this.http.get<Array<ITechTypes>>(url, { headers: getHttpHeaders() });
    }
  }

  getVendorsList(techTypeId: string) {
    let url = `${API_URL}instruments/vendorsByStudyType`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post<Array<IVendorList>>(LOCAL_API_URL, {
        url: url,
        type: "get",
        params: { techType: techTypeId }
      });
    } else {
      return this.http.get<Array<IVendorList>>(url, {
        params: { techType: techTypeId },
        headers: getHttpHeaders()
      });
    }
  }

  getInstrumentList() {
    let url = `${API_URL}instrument-models/paged?asc=true&filter=undefined&filterQuery=&items=25&page=1&paged=paged&sortingField=name`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post<Array<ITechTypes>>(LOCAL_API_URL, {
        url: url,
        type: "get"
      });
    } else {
      return this.http.get<Array<ITechTypes>>(url, { headers: getHttpHeaders() });
    }
  }
}

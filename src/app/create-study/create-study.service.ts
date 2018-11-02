import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL, LOCAL_API_URL } from "../constants";
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

    return this.http.post<Array<IProject>>(LOCAL_API_URL, {
      url: url,
      type: "get",
      params: { userId: undefined }
    });

    // return this.http.get(url, {
    //   params: { userId: undefined },
    //   headers: getHttpHeaders()
    // });
  }

  getSpecies() {
    let url = `${API_URL}experiments/new/species`;
    url = appendSession(url);

    return this.http.post<Array<ISpeciesList>>(LOCAL_API_URL, {
      url: url,
      type: "get"
    });

    // return this.http.get(url, { headers: getHttpHeaders() });
  }

  getTechTypes() {
    let url = `${API_URL}instruments/studyTypes`;
    url = appendSession(url);

    return this.http.post<Array<ITechTypes>>(LOCAL_API_URL, {
      url: url,
      type: "get"
    });

    // return this.http.get(url, { headers: getHttpHeaders() });
  }

  getVendorsList(techTypeId: string) {
    let url = `${API_URL}instruments/vendorsByStudyType`;
    url = appendSession(url);

    return this.http.post<Array<IVendorList>>(LOCAL_API_URL, {
      url: url,
      type: "get",
      params: { techType: techTypeId }
    });

    // return this.http.get(url, {
    //   params: { techType: techTypeId },
    //   headers: getHttpHeaders()
    // });
  }
}

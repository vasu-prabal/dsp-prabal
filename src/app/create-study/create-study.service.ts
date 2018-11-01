import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL, LOCAL_API_URL } from "../constants";
import { getToken, getHttpHeaders, appendSession } from "../common";
import { ISpeciesList, ITechTypes } from "../home/home-modal";

@Injectable({
  providedIn: "root"
})
export class CreateStudyService {
  constructor(public http: HttpClient) {}

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
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, IS_LOCAL_API, LOCAL_API_URL } from "../constants";
import { appendSession } from "../common";

@Injectable({
  providedIn: "root"
})
export class InstrumentsService {
  constructor(public http: HttpClient) {}

  getInstrumentsList(searchFilter) {
    let url = `${API_URL}instrument-models/paged`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "get",
        params: searchFilter
      });
    } else {
      return this.http.get(url, { params: searchFilter });
    }
  }
}

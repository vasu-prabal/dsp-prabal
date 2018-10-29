import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getToken, appendSession, getHttpHeaders } from "../common";
import { API_URL } from "../constants";
@Injectable({
  providedIn: "root"
})
export class ProtocolService {
  constructor(public http: HttpClient) {}

  getProtocolsList() {
    let url = `${API_URL}protocols/details/1`;
    url = appendSession(url);
    const headers = getHttpHeaders();
    return this.http.get(url, {
      headers: headers
    });
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../constants";
import { appendSession, getHttpHeaders } from "../common";
@Injectable({
  providedIn: "root"
})
export class CreateProtocolService {
  constructor(public http: HttpClient) {}

  createProtocol(protocolObj) {
    let url = `${API_URL}protocols`;
    url = appendSession(url);
    return this.http.post(url, protocolObj, {
      headers: getHttpHeaders()
    });
  }

  updateProtocol(protocolObj) {
    let url = `${API_URL}protocols`;
    url = appendSession(url);
    return this.http.put(url, protocolObj, {
      headers: getHttpHeaders()
    });
  }
}

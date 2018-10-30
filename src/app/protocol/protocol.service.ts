import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getToken, appendSession, getHttpHeaders } from "../common";
import { API_URL } from "../constants";
import { IProtocol } from "../home/home-modal";
@Injectable({
  providedIn: "root"
})
export class ProtocolService {
  constructor(public http: HttpClient) {}

  getProtocolsList() {
    let url = `${API_URL}protocols`;
    url = appendSession(url);
    const headers = getHttpHeaders();
    return this.http.get<Array<IProtocol>>(url, {
      headers: headers
    });
  }

  deleteProtocol(id) {
    let url = `${API_URL}protocols/${id}`;
    url = appendSession(url);
    const headers = getHttpHeaders();
    return this.http.delete(url, {
      headers: headers
    });
  }
}

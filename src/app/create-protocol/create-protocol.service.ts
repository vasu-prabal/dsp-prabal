import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, LOCAL_API_URL, IS_LOCAL_API } from "../constants";
import { appendSession, getHttpHeaders } from "../common";
@Injectable({
  providedIn: "root"
})
export class CreateProtocolService {
  constructor(public http: HttpClient) {}

  createProtocol(protocolObj) {
    let url = `${API_URL}protocols`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "post",
        data: protocolObj
      });
    } else {
      return this.http.post(url, protocolObj, {
        headers: getHttpHeaders()
      });
    }
  }

  updateProtocol(protocolObj) {
    let url = `${API_URL}protocols`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "put",
        data: protocolObj
      });
    } else {
      return this.http.put(url, protocolObj, {
        headers: getHttpHeaders()
      });
    }
  }

  getProtocol(id) {
    let url = `${API_URL}protocols/details/${id}`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "get"
      });
    } else {
      return this.http.get(url, {
        headers: getHttpHeaders()
      });
    }
  }
}

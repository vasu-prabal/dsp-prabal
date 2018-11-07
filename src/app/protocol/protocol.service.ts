import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getToken, appendSession, getHttpHeaders } from "../common";
import { API_URL, LOCAL_API_URL, IS_LOCAL_API } from "../constants";
import { IProtocolList } from "../home/home-modal";
@Injectable({
  providedIn: "root"
})
export class ProtocolService {
  constructor(public http: HttpClient) {}

  getProtocolsList(searchFilter) {
    let url = `${API_URL}protocols/paged`;
    url = appendSession(url);
    const headers = getHttpHeaders();
    if (IS_LOCAL_API) {
      return this.http.post<IProtocolList>(LOCAL_API_URL, {
        url: url,
        type: "get",
        params: searchFilter
      });
    } else {
      return this.http.get<IProtocolList>(url, {
        params: searchFilter
      });
    }
  }

  deleteProtocol(id) {
    let url = `${API_URL}protocols/${id}`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "delete"
      });
    } else {
      const headers = getHttpHeaders();
      return this.http.delete(url);
    }
  }
}

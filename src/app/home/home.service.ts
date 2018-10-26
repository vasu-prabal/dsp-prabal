import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILogin, IMailsList } from "./home-modal";
import { getToken, getHttpHeaders, appendSession } from "../common";
import { API_URL } from "../constants";
@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor(public http: HttpClient) {}

   getMailsList(type: string, searchFilter) {
    let url = `${API_URL}projects/paged/${type}`;
    url = appendSession(url);
    return this.http.get<IMailsList>(url, {
      params: searchFilter,
      headers: getHttpHeaders()
    });
  }
}

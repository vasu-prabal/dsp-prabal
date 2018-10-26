import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILogin, IMailsList } from "./home-modal";
import { getHeaders, getToken } from "../common";
import { API_URL } from "../constants";
@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor(public http: HttpClient) {}

  doLogin(login: ILogin) {
    const headersConfig = getHeaders();
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    const formData = new FormData();
    formData.append("j_username", login.j_username);
    formData.append("j_password", login.j_password);
    formData.append(
      "_spring_security_remember_me",
      login._spring_security_remember_me
    );
    return this.http.post(
      API_URL + "j_spring_security_check?redirectAfterLogin=",
      formData,
      {
        headers,
        responseType: "text" as "json",
        observe: "response" as "body"
      }
    );
  }

  getMailsList(type: string, searchFilter) {
    const token = getToken();
    document.cookie = `jsessionid=${token}`;
    return this.http.get<IMailsList>(
      `${API_URL}projects/paged/${type};jsessionid=${token}`,
      {
        params: searchFilter,
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }
    );
  }
}

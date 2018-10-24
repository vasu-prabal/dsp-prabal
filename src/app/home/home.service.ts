import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams
} from "@angular/common/http";
import { IProject, ILogin, IMailSearch, IMailsList } from "./home-modal";
import { getHeaders, getToken } from "../common";
import { API_URL } from "../constants";
import { Http, Response, Headers } from "@angular/http";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor(public http: HttpClient) {}

  doLogin(login: ILogin) {
    const headersConfig = getHeaders();
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Accept: "application/json",
    //     responseType: "text"
    //   })
    // };
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    // headers.append("Accept", "text/plain");
    // const body = new HttpParams()
    //   .set("j_username", login.j_username)
    //   .set("j_password", login.j_password)
    //   .set("_spring_security_remember_me", login._spring_security_remember_me);
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
    // return this.http.get("https://www.reddit.com/r/Angular2.json");

    // const httpOptions = {
    //   headers: new Headers({
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   })
    // };
    // const formData = new FormData();
    // formData.append("j_username", login.j_username);
    // formData.append("j_password", login.j_password);
    // formData.append(
    //   "_spring_security_remember_me",
    //   login._spring_security_remember_me
    // );
    // return this.http.post(
    //   API_URL + "j_spring_security_check",
    //   login,
    //   httpOptions
    // );
    // .pipe(map(data => data.json()));
  }

  getMailsList(type: string, searchFilter) {
    const headersConfig = getHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json"
      })
    };
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

    // return [
    //   {
    //     id: 111,
    //     name: "CPTAC Retrospective",
    //     owner: "Ratna Thangudu",
    //     laboratory: "Clinical Proteomic",
    //     area: "Proteomics",
    //     modified: "Jul 19, 2018"
    //   },
    //   {
    //     id: 108,
    //     name: "Test",
    //     owner: "Ratna Thangudu",
    //     laboratory: "ESAC",
    //     area: "Proteomics",
    //     modified: "Jul 29, 2018"
    //   },
    //   {
    //     id: 1,
    //     name: "Personal Genome Project",
    //     owner: "Pavel Kaplin",
    //     laboratory: "First chorus lab",
    //     area: "Technology",
    //     modified: "Jul 20, 2018"
    //   },
    //   {
    //     id: 2,
    //     name: "Drive for biomas to feed synthetic organisms",
    //     owner: "Pavel Kaplin",
    //     laboratory: "First chorus lab",
    //     area: "Synthetic Biology",
    //     modified: "Jul 20, 2018"
    //   },
    //   {
    //     id: 3,
    //     name: "Small Molecule screen",
    //     owner: "Pavel Kaplin",
    //     laboratory: "First chorus lab",
    //     area: "Technology science",
    //     modified: "Jul 20, 2018"
    //   }
    // ];
  }
}

import { Injectable } from "@angular/core";
import { ILogin } from "./home/home-modal";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {
  API_URL,
  LOCAL_API_URL,
  PROTOCOL_ADDED,
  PROJECT_ADDED,
  IS_LOCAL_API,
  INSTRUMENT_MODEL_ADDED
} from "./constants";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  private listener = new Subject<any>();
  constructor(public http: HttpClient) {}

  listen(): Observable<any> {
    return this.listener.asObservable();
  }

  protocolAdded() {
    this.listener.next(PROTOCOL_ADDED);
  }

  projectAdded() {
    this.listener.next(PROJECT_ADDED);
  }

  instrumentModelAdded() {
    this.listener.next(INSTRUMENT_MODEL_ADDED);
  }

  doLogin(login: ILogin) {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    const formData = new FormData();
    formData.append("j_username", login.j_username);
    formData.append("j_password", login.j_password);
    formData.append(
      "_spring_security_remember_me",
      login._spring_security_remember_me
    );
    if (IS_LOCAL_API) {
      return this.http.post(`${LOCAL_API_URL}/login`, {
        data: login,
        method: "post",
        url: API_URL + "j_spring_security_check?redirectAfterLogin="
      });
    } else {
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
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { IProject, ILogin } from "./home-modal";
import { getHeaders } from "../common";
import { API_URL } from "../constants";
import { Http } from "@angular/http";
@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor(public http: Http) {}

  doLogin(login: ILogin) {
    const headersConfig = getHeaders();
    const params = new HttpParams()
      .set("j_username", login.j_username)
      .set("j_password", login.j_password)
      .set("_spring_security_remember_me", login._spring_security_remember_me);
    return this.http.get(
      `${API_URL}j_spring_security_check?redirectAfterLogin=`,
      {
        params: params
      }
    );
  }

  getMailsList() {
    // const headersConfig = getHeaders();
    // return this.http.get(
    //   `${API_URL}projects/paged/my?asc=false&filterQuery=&items=25&labId=0&page=1&sortingField=modified&userId=undefined`,
    //   headersConfig
    // );
    return [
      {
        id: 111,
        name: "CPTAC Retrospective",
        owner: "Ratna Thangudu",
        laboratory: "Clinical Proteomic",
        area: "Proteomics",
        modified: "Jul 19, 2018"
      },
      {
        id: 108,
        name: "Test",
        owner: "Ratna Thangudu",
        laboratory: "ESAC",
        area: "Proteomics",
        modified: "Jul 29, 2018"
      },
      {
        id: 1,
        name: "Personal Genome Project",
        owner: "Pavel Kaplin",
        laboratory: "First chorus lab",
        area: "Technology",
        modified: "Jul 20, 2018"
      },
      {
        id: 2,
        name: "Drive for biomas to feed synthetic organisms",
        owner: "Pavel Kaplin",
        laboratory: "First chorus lab",
        area: "Synthetic Biology",
        modified: "Jul 20, 2018"
      },
      {
        id: 3,
        name: "Small Molecule screen",
        owner: "Pavel Kaplin",
        laboratory: "First chorus lab",
        area: "Technology science",
        modified: "Jul 20, 2018"
      }
    ];
  }
}

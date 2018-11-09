import { Injectable } from "@angular/core";
import { appendSession } from "../common";
import { API_URL, IS_LOCAL_API, LOCAL_API_URL } from "../constants";
import { HttpClient } from "@angular/common/http";
import { IStudyList } from "./study-modal";

@Injectable({
  providedIn: "root"
})
export class StudyService {
  constructor(public http: HttpClient) {}

  getStudyList(type: string, searchFilter) {
    let url = `${API_URL}experiments/paged/${type}`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post<IStudyList>(LOCAL_API_URL, {
        url: url,
        type: "post",
        data: searchFilter
      });
    } else {
      return this.http.post<IStudyList>(url, searchFilter);
    }
  }
}

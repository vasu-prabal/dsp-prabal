import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILogin, IMailsList } from "./home-modal";
import { getToken, getHttpHeaders, appendSession } from "../common";
import { API_URL, LOCAL_API_URL } from "../constants";
import { RequestOptions } from "@angular/http";
@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor(public http: HttpClient) {}

  getMailsList(type: string, searchFilter) {
    let url = `${API_URL}projects/paged/${type}`;
    url = appendSession(url);
    return this.http.post<IMailsList>(LOCAL_API_URL, {
      url: url,
      type: "get",
      params: searchFilter
      // params: searchFilter,
      // headers: getHttpHeaders()
    });
  }

  getUsersList() {
    let url = `${API_URL}users`;
    url = appendSession(url);
    return this.http.get(url, {
      headers: getHttpHeaders()
    });
  }

  getUploadFileId(fileDetails) {
    let url = `${API_URL}attachments/project/items`;
    url = appendSession(url);
    return this.http.post(url, fileDetails, {
      headers: getHttpHeaders()
    });
  }

  getUploadFilePath(id) {
    let url = `${API_URL}attachments/project/destination/${id}`;
    url = appendSession(url);
    return this.http.get(url, {
      headers: getHttpHeaders()
    });
  }

  getUploadSingleFilePath(data) {
    let url = `${API_URL}cors/sign/singlefile`;
    url = appendSession(url);
    return this.http.post(url, data, {
      headers: getHttpHeaders()
    });
  }

  uploadFile(url, file, key) {
    const obj = {
      Key: key,
      Body: file,
      ContentType: file.type
    };
    return this.http.put(url, file);
  }
}

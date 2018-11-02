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

    // return this.http.get<IMailsList>(url, {
    //   params: searchFilter,
    //   headers: getHttpHeaders()
    // });
  }

  getLabItems() {
    let url = `${API_URL}laboratories/my/labitems`;
    url = appendSession(url);

    return this.http.post(LOCAL_API_URL, {
      url: url,
      type: "get"
    });

    // return this.http.get(url, { headers: getHttpHeaders() });
  }

  getUsersList() {
    let url = `${API_URL}users`;
    url = appendSession(url);

    return this.http.post(LOCAL_API_URL, {
      url: url,
      type: "get"
    });

    // return this.http.get(url, {
    //   headers: getHttpHeaders()
    // });
  }

  getUploadFileId(type, fileDetails) {
    let url = `${API_URL}attachments/${type}/items`;
    url = appendSession(url);

    return this.http.post(LOCAL_API_URL, {
      url: url,
      type: "post",
      data: fileDetails
    });

    // return this.http.post(url, fileDetails, {
    //   headers: getHttpHeaders()
    // });
  }

  getUploadFilePath(type, id) {
    let url = `${API_URL}attachments/${type}/destination/${id}`;
    url = appendSession(url);

    return this.http.post(LOCAL_API_URL, {
      url: url,
      type: "get"
    });

    // return this.http.get(url, {
    //   headers: getHttpHeaders()
    // });
  }

  getUploadSingleFilePath(data) {
    let url = `${API_URL}cors/sign/singlefile`;
    url = appendSession(url);

    return this.http.post(LOCAL_API_URL, {
      url: url,
      type: "post",
      data: data
    });

    // return this.http.post(url, data, {
    //   headers: getHttpHeaders()
    // });
  }

  uploadFile(url, file, key) {
    const obj = {
      Key: key,
      Body: file,
      ContentType: file.type
    };

    return this.http.post(LOCAL_API_URL, {
      url: url,
      type: "put",
      data: file
    });

    // return this.http.put(url, file, {
    //   headers: new HttpHeaders({ "Content-Type": "image/jpg" })
    // });
  }
}

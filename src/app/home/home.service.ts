import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILogin, IMailsList, IProject } from "./home-modal";
import { getToken, getHttpHeaders, appendSession } from "../common";
import { API_URL, LOCAL_API_URL, IS_LOCAL_API } from "../constants";
import { RequestOptions } from "@angular/http";
@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor(public http: HttpClient) {}

  getProjectsList(type: string, searchFilter) {
    let url = `${API_URL}projects/paged/${type}`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post<IMailsList>(LOCAL_API_URL, {
        url: url,
        type: "get",
        params: searchFilter
      });
    } else {
      return this.http.get<IMailsList>(url, {
        params: searchFilter,
        headers: getHttpHeaders()
      });
    }
  }

  addNewProject(projectDetails: IProject) {
    let url = `${API_URL}projects`;
    url = appendSession(url);

    url = `${url}?userId=undefined`;

    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "post",
        data: projectDetails
      });
    } else {
      return this.http.post(url, projectDetails, {
        headers: getHttpHeaders()
      });
    }
  }

  getLabItems() {
    let url = `${API_URL}laboratories/my/labitems`;
    url = appendSession(url);

    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "get"
      });
    } else {
      return this.http.get(url, { headers: getHttpHeaders() });
    }
  }

  getUsersList() {
    let url = `${API_URL}users`;
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

  getMaxFileSizeUpload(type) {
    let url = `${API_URL}attachments/${type}/maxSizeInBytes`;
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

  getUploadFileId(type, fileDetails) {
    let url = `${API_URL}attachments/${type}/items`;
    url = appendSession(url);

    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "post",
        data: fileDetails
      });
    } else {
      return this.http.post(url, fileDetails, {
        headers: getHttpHeaders()
      });
    }
  }

  getUploadFilePath(type, id) {
    let url = `${API_URL}attachments/${type}/destination/${id}`;
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

  getUploadSingleFilePath(data) {
    let url = `${API_URL}cors/sign/singlefile`;
    url = appendSession(url);
    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "post",
        data: data
      });
    } else {
      return this.http.post(url, data, {
        headers: getHttpHeaders()
      });
    }
  }

  uploadFile(url, file, key) {
    const obj = {
      Key: key,
      Body: file,
      ContentType: file.type
    };
    if (IS_LOCAL_API) {
      return this.http.post(LOCAL_API_URL, {
        url: url,
        type: "put",
        data: file
      });
    } else {
      return this.http.put(url, file, {
        headers: new HttpHeaders({ "Content-Type": "image/jpg" })
      });
    }
  }
}

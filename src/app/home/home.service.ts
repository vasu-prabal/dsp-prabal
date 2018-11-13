import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILogin, IMailsList, IProject } from "./home-modal";
import { getToken, getHttpHeaders, appendSession } from "../common";
import { API_URL, LOCAL_API_URL, IS_LOCAL_API } from "../constants";
import { RequestOptions } from "@angular/http";
import { IProjectLab } from "../create-project/create-project-modal";
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
        params: searchFilter
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
      return this.http.post(url, projectDetails);
    }
  }

  getLabItems() {
    let url = `${API_URL}laboratories/my/labitems`;
    url = appendSession(url);

    if (IS_LOCAL_API) {
      return this.http.post<Array<IProjectLab>>(LOCAL_API_URL, {
        url: url,
        type: "get"
      });
    } else {
      return this.http.get<Array<IProjectLab>>(url);
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
      return this.http.get(url);
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
      return this.http.get(url);
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
      return this.http.post(url, fileDetails);
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
      return this.http.get(url);
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
      return this.http.post(url, data);
    }
  }

  uploadFile(url, file, key) {
    const obj = {
      Key: key,
      Body: file,
      ContentType: file.type
    };
    // if (IS_LOCAL_API) {
    //   return this.http.post(LOCAL_API_URL, {
    //     url: url,
    //     type: "put",
    //     data: file
    //   });
    // } else {
      return this.http.put(url, file);
    // }
  }
}

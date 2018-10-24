import { RequestOptions, Headers } from "@angular/http";
import { HttpHeaders } from "@angular/common/http";
export function getToken() {
  return localStorage.getItem("authToken");
}

export function setToken(token: string) {
  return localStorage.setItem("authToken", token);
}

export function getHeaders() {
  const token = getToken();
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  if (token) {
    headers["JSESSIONID"] = token;
  }
  const contentHeaders = {
    headers: new HttpHeaders(headers)
  };
  // const headers = {
  //   "Content-Type": "application/x-www-form-urlencoded"
  // };
  // const contentHeaders = new HttpHeaders();
  // contentHeaders.append("Accept", "application/json");
  // contentHeaders.append("Content-Type", "application/json");
  // if (token) {
  //   contentHeaders.append("JSESSIONID", token);
  // }
  return contentHeaders;
}

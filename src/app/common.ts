import { RequestOptions, Headers } from "@angular/http";
import { HttpHeaders } from "@angular/common/http";
export function getToken() {
  return localStorage.getItem("authToken");
}

export function setToken(token: string) {
  return localStorage.setItem("authToken", token);
}

export function getHttpHeaders() {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers["JSESSIONID"] = token;
  }
  const httpHeaders = new HttpHeaders(headers);
  return httpHeaders;
}

export function appendSession(url) {
  const token = getToken();
  return `${url};jsessionid=${token}`;
}

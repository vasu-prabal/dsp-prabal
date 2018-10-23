import { RequestOptions, Headers } from "@angular/http";
export function getToken() {
  return localStorage.getItem("authToken");
}

export function setToken(token: string) {
  return localStorage.setItem("authToken", token);
}

export function getHeaders() {
  const token = getToken();
  if (token) {
    const headers = new Headers({
      "Cookie": token,
      "Access-Control-Allow-Origin": "*"
    });
    return new RequestOptions({ headers: headers });
  } else {
    const headers = new Headers({ "Access-Control-Allow-Origin": "*" });
    return new RequestOptions({ headers: headers });
  }
}

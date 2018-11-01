import { ILogin } from "./home/home-modal";

// export const API_URL = "http://cors-anywhere.herokuapp.com/http://pdc-development.esacinc.com:8080/workspace/";
export const API_URL =
  "http://pdc-development.esacinc.com:8080/workspace/";

export const LOCAL_API_URL = "http://localhost:4201/getData";
export const loginUserDetails: ILogin = {
  j_username: "demo-user",
  j_password: "pwd",
  _spring_security_remember_me: "on"
};

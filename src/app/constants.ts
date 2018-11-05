import { ILogin } from "./home/home-modal";

// export const API_URL = "http://pdc-development.esacinc.com:8080/workspace/";
export const API_URL = "http://pdc-development.esacinc.com:8080/workspace/";

// export const LOCAL_API_URL =
//   "http://chorusproxy.ap-south-1.elasticbeanstalk.com/getData";
export const LOCAL_API_URL = "http://localhost:4201/getData";
export const loginUserDetails: ILogin = {
  j_username: "demo-user",
  j_password: "pwd",
  _spring_security_remember_me: "on"
};

export const PROTOCOL_ADDED = "Protocol Added";
export const PROJECT_ADDED = "Project Added";

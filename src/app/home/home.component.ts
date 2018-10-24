import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { IProject, IMailSearch, ILogin } from "./home-modal";
import { getToken, setToken } from "../common";
declare var jQuery: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mailsList: IProject[];
  newProject: IProject = {
    id: undefined,
    name: "",
    area: "",
    laboratory: "",
    modified: "",
    owner: ""
  };
  searchFilter: IMailSearch = {
    page: 1,
    items: 25
  };
  constructor(public homeService: HomeService) {}

  ngOnInit() {
    const token = getToken();
    // jsessionid=18FBB13222FF567DA43A9489A88E75C4
    // this.cookieService.set("jsessionid", "18FBB13222FF567DA43A9489A88E75C4");
    // setToken("18FBB13222FF567DA43A9489A88E75C4");
    if (!token) {
      const login: ILogin = {
        j_username: "demo-user",
        j_password: "pwd",
        _spring_security_remember_me: "on"
      };
      this.homeService.doLogin(login).subscribe(data => {
        let main_headers = {};
        const keys = data.headers.keys();
        keys.map(key => {
          `${key}: ${data.headers.get(key)}`;
          main_headers[key] = data.headers.get(key);
        });
        let token = main_headers["x-final-url"];
        token = token.split("=").pop();
        setToken(token);
        this.getMailsList();
      });
    } else {
      this.getMailsList();
    }
  }

  getMailsList() {
    this.homeService.getMailsList().subscribe(data => {
      console.log(data);
    });
    // this.mailsList = this.homeService.getMailsList();
  }
}

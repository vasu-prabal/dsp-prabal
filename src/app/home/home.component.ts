import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { IProject, IMailSearch, ILogin, IMailsList } from "./home-modal";
import { getToken, setToken } from "../common";
import * as moment from 'moment';
declare var jQuery: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mailsList: IMailsList = {
    items: [],
    itemsCount: 0,
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0
  };
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
  type = "all";
  projectType = "All Projects";
  defaultProjectTypes: Array<string> = ["all", "my", "shared", "public"];
  constructor(public homeService: HomeService) {}

  ngOnInit() {
    const viewType = location.href.split("/").pop();
    if (viewType) {
      if (this.defaultProjectTypes.indexOf(viewType) > -1) {
        this.type = viewType;
        switch (this.type) {
          case "all":
            this.projectType = "All Projects";
            break;
          case "my":
            this.projectType = "My Projects";
            break;
          case "public":
            this.projectType = "Public Projects";
            break;
          case "shared":
            this.projectType = "Shared Projects";
            break;
        }
      }
    }
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
    this.homeService.getMailsList(this.type).subscribe(data=> {
      // console.log(data);
      this.mailsList = data;
      this.mailsList.items.forEach((project)=>{
        project.columns.modified=moment(project.columns.modified).format("MMM DD, YYYY");
      }
    });
  }
}

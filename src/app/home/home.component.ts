import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import {
  IProject,
  IMailSearch,
  ILogin,
  IMailsList,
  IProjectColumns
} from "./home-modal";
import { getToken, setToken } from "../common";
import * as moment from "moment";
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
  newProject: IProjectColumns = {
    id: undefined,
    name: "",
    area: "",
    laboratory: "",
    modified: "",
    owner: ""
  };
  searchFilter: IMailSearch = {
    asc: false,
    filterQuery: "",
    items: 25,
    labId: 0,
    page: 1,
    sortingField: "modified",
    userId: undefined
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
    let token = getToken();
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
        token = data["headers"].get("x-final-url");
        token = token.split("=").pop();
        setToken(token);
        this.getMailsList();
      });
    } else {
      this.getMailsList();
    }
  }

  getMailsList() {
    this.homeService
      .getMailsList(this.type, this.searchFilter)
      .subscribe(data => {
        this.mailsList = data;
        this.mailsList.items.forEach(project => {
          project.columns.modified = moment(project.columns.modified).format(
            "MMM DD, YYYY"
          );
        });
      });
  }

  sortProjects(sortType) {
    let isAsc = false;
    if (this.searchFilter.sortingField === sortType) {
      isAsc = this.searchFilter.asc ? false : true;
    }
    this.searchFilter.sortingField = sortType;
    this.searchFilter.asc = isAsc;
    this.getMailsList();
  }
}

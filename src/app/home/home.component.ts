import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HomeService } from "./home.service";
import {
  IListSearchFilter,
  ILogin,
  IMailsList,
  IProjectColumns
} from "./home-modal";
import { getToken, setToken, showOrHideLoading } from "../common";
import * as moment from "moment";
import { Params, ActivatedRoute } from "@angular/router";
import {
  loginUserDetails,
  PROTOCOL_ADDED,
  PROJECT_ADDED,
  IS_LOCAL_API
} from "../constants";
import { CommonService } from "../common.service";
declare var jQuery: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["../common/resize-table.css", "./home.component.css"]
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
  searchFilter: IListSearchFilter = {
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
  constructor(
    public homeService: HomeService,
    public route: ActivatedRoute,
    public commonService: CommonService
  ) {
    localStorage.clear();
    this.route.params.subscribe((params: Params) => {
      this.searchFilter.page = 1;
      this.searchFilter.filterQuery = "";
      this.checkToken(params.type);
    });
    this.commonService.listen().subscribe((type: any) => {
      if (type === PROJECT_ADDED) {
        this.searchFilter.page = 1;
        this.getProjectsList();
      }
    });
  }

  ngOnInit() {
    jQuery(".projects-table").colResizable({
      // resizeMode: "overflow",
      disabledColumns: [0, 1],
      minWidth: 150
    });
  }

  checkToken(projectType) {
    if (projectType) {
      if (this.defaultProjectTypes.indexOf(projectType) > -1) {
        this.type = projectType;
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
    if (!token) {
      showOrHideLoading(true);
      this.commonService.doLogin(loginUserDetails).subscribe(
        data => {
          if (IS_LOCAL_API) {
            token = data["sessionId"];
          } else {
            token = data["headers"].get("x-final-url");
            token = token.split("=").pop();
          }
          setToken(token);
          this.getProjectsList();
        },
        error => {
          showOrHideLoading(false);
        }
      );
    } else {
      this.getProjectsList();
    }
  }

  getProjectsList() {
    showOrHideLoading(true);
    this.homeService.getProjectsList(this.type, this.searchFilter).subscribe(
      data => {
        this.mailsList = data;
        this.mailsList.items.forEach(project => {
          project.columns.modified = moment(project.columns.modified).format(
            "MMM DD, YYYY"
          );
        });
        showOrHideLoading(false);
      },
      error => {
        showOrHideLoading(false);
      }
    );
  }

  getNextResults() {
    this.searchFilter.page += 1;
    this.getProjectsList();
  }

  getPreviousResults() {
    this.searchFilter.page -= 1;
    this.getProjectsList();
  }

  sortProjects(sortType) {
    let isAsc = false;
    if (this.searchFilter.sortingField === sortType) {
      isAsc = this.searchFilter.asc ? false : true;
    }
    this.searchFilter.sortingField = sortType;
    this.searchFilter.asc = isAsc;
    this.searchResults();
  }

  searchResults() {
    this.searchFilter.page = 1;
    this.getProjectsList();
  }
}

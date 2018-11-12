import { Component, OnInit } from "@angular/core";
import { IStudyList, IStudyModal } from "./study-modal";
import { IStudy, IListSearchFilter } from "../home/home-modal";
import { StudyService } from "./study.service";
import { ActivatedRoute, Params } from "@angular/router";
import { CommonService } from "../common.service";
import { STUDY_ADDED, IS_LOCAL_API, loginUserDetails } from "../constants";
import { showOrHideLoading, setToken, getToken } from "../common";
import * as moment from "moment";
declare var jQuery;
@Component({
  selector: "app-studies",
  templateUrl: "./studies.component.html",
  styleUrls: ["../common/resize-table.css", "./studies.component.css"]
})
export class StudiesComponent implements OnInit {
  studyList: IStudyList = {
    items: [],
    itemsCount: 0,
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0
  };
  newStudy: IStudyModal = {
    id: undefined,
    name: ""
  };
  searchFilter: IListSearchFilter = {
    asc: false,
    filter: "all",
    filterQuery: "",
    items: 25,
    labId: 0,
    page: 1,
    paged: "paged",
    sortingField: "modified"
  };
  type = "all";
  studyType = "All Studies";
  defaultStudyTypes: Array<string> = ["all", "my", "shared", "public"];
  constructor(
    public studyService: StudyService,
    public route: ActivatedRoute,
    public commonService: CommonService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.searchFilter.page = 1;
      this.searchFilter.filterQuery = "";
      this.checkToken(params.type);
    });
    this.commonService.listen().subscribe((type: any) => {
      if (type === STUDY_ADDED) {
        this.searchFilter.page = 1;
        this.getStudyList();
      }
    });
  }

  ngOnInit() {
    jQuery(".study-table").colResizable({
      // resizeMode: "overflow",
      disabledColumns: [0, 1],
      minWidth: 150
    });
  }

  checkToken(studyType) {
    if (studyType) {
      if (this.defaultStudyTypes.indexOf(studyType) > -1) {
        this.type = studyType;
        switch (this.type) {
          case "all":
            this.studyType = "All Studies";
            break;
          case "my":
            this.studyType = "My Studies";
            break;
          case "public":
            this.studyType = "Public Studies";
            break;
          case "shared":
            this.studyType = "Shared with Me Studies";
            break;
        }
      }
    }
    this.getStudyList();
  }

  getStudyList() {
    showOrHideLoading(true);
    this.studyService.getStudyList(this.type, this.searchFilter).subscribe(
      data => {
        this.studyList = data;
        this.studyList.items.forEach(study => {
          study.columns.modified = moment(study.columns.modified).format(
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
    this.getStudyList();
  }

  getPreviousResults() {
    this.searchFilter.page -= 1;
    this.getStudyList();
  }

  sortStudies(sortType) {
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
    this.getStudyList();
  }
}

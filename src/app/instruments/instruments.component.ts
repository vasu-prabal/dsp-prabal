import { Component, OnInit } from "@angular/core";
import { IInstrumentList } from "./instruments-modal";
import { InstrumentsService } from "./instruments.service";
import { IListSearchFilter } from "../home/home-modal";
import { CommonService } from "../common.service";
import {
  INSTRUMENT_MODEL_ADDED,
  loginUserDetails,
  IS_LOCAL_API
} from "../constants";
import { getToken, showOrHideLoading, setToken } from "../common";

declare var jQuery;
@Component({
  selector: "app-instruments",
  templateUrl: "./instruments.component.html",
  styleUrls: ["../common/resize-table.css", "./instruments.component.css"]
})
export class InstrumentsComponent implements OnInit {
  instrumentsList: IInstrumentList = {
    items: [],
    itemsCount: 0,
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0
  };
  searchFilter: IListSearchFilter = {
    asc: true,
    filter: undefined,
    filterQuery: "",
    items: 25,
    page: 1,
    paged: "paged",
    sortingField: "name"
  };
  constructor(
    public instrumentService: InstrumentsService,
    public commonService: CommonService
  ) {
    this.commonService.listen().subscribe((type: any) => {
      if (type === INSTRUMENT_MODEL_ADDED) {
        this.searchFilter.page = 1;
        this.searchFilter.filterQuery = "";
        this.getInstrumentsList();
      }
    });
  }

  ngOnInit() {
    jQuery(".instruments-table").colResizable({
      // resizeMode: "overflow",
      disabledColumns: [0, 1],
      minWidth: 150
    });
    this.getInstrumentsList();
  }

  getInstrumentsList() {
    showOrHideLoading(true);
    this.instrumentService.getInstrumentsList(this.searchFilter).subscribe(
      data => {
        this.instrumentsList = data["value"];
        showOrHideLoading(false);
      },
      error => {
        showOrHideLoading(false);
      }
    );
  }

  getNextResults() {
    this.searchFilter.page += 1;
    this.getInstrumentsList();
  }

  getPreviousResults() {
    this.searchFilter.page -= 1;
    this.getInstrumentsList();
  }

  sortInstruments(sortType) {
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
    this.getInstrumentsList();
  }
}

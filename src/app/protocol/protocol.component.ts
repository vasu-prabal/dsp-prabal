import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import {
  getToken,
  setToken,
  showConfirmDialog,
  showOrHideLoading
} from "../common";
import { CommonService } from "../common.service";
import { loginUserDetails, PROTOCOL_ADDED, IS_LOCAL_API } from "../constants";
import { ProtocolService } from "./protocol.service";
import { IProtocol, ISearch, IListSearchFilter } from "../home/home-modal";
import * as moment from "moment";
import { CreateButtonComponent } from "../create-button/create-button.component";

declare var jQuery: any;
@Component({
  selector: "app-protocol",
  templateUrl: "./protocol.component.html",
  styleUrls: ["../common/resize-table.css", "./protocol.component.css"]
})
export class ProtocolComponent implements OnInit {
  @ViewChild(CreateButtonComponent)
  createButton: CreateButtonComponent;
  protocols: Array<IProtocol> = [];
  searchFilter: IListSearchFilter = {
    page: 1,
    items: 25,
    asc: false,
    sortingField: "protocolDate"
  };
  constructor(
    public commonService: CommonService,
    public protocolService: ProtocolService
  ) {
    this.commonService.listen().subscribe((type: any) => {
      if (type === PROTOCOL_ADDED) {
        this.searchFilter.page = 1;
        this.searchFilter.filterQuery = "";
        this.getProtocolsList();
      }
    });
  }

  ngOnInit() {
    this.checkToken();
    jQuery(".protocols-table").colResizable({
      // resizeMode: "overflow",
      disabledColumns: [0, 1],
      minWidth: 150
    });
  }

  checkToken() {
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
          this.getProtocolsList();
        },
        error => {
          showOrHideLoading(false);
        }
      );
    } else {
      this.getProtocolsList();
    }
  }

  getProtocolsList() {
    showOrHideLoading(true);
    this.protocolService.getProtocolsList(this.searchFilter).subscribe(
      data => {
        this.protocols = data.items;
        this.protocols.forEach(protocol => {
          protocol.protocolDate = moment(protocol.protocolDate).format(
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
    this.getProtocolsList();
  }

  getPreviousResults() {
    this.searchFilter.page -= 1;
    this.getProtocolsList();
  }

  sortProtocols(sortType) {
    // console.log(sortType);
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
    this.getProtocolsList();
  }

  deleteProtocol(id) {
    showConfirmDialog(
      "Are you sure",
      "Do you want to delete protocol",
      "warning",
      isConfirm => {
        if (isConfirm) {
          this.protocolService.deleteProtocol(id).subscribe(
            data => {
              this.getProtocolsList();
            },
            error => {
              this.getProtocolsList();
            }
          );
        }
      }
    );
  }

  editProtocol(id) {
    this.createButton.createProtocol.editProtocol(id);
  }
}

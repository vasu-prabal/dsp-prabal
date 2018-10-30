import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { getToken, setToken, showConfirmDialog } from "../common";
import { CommonService } from "../common.service";
import { loginUserDetails } from "../constants";
import { ProtocolService } from "./protocol.service";
import { IProtocol, ISearch, IMailSearch } from "../home/home-modal";
import * as moment from "moment";

declare var jQuery: any;
@Component({
  selector: "app-protocol",
  templateUrl: "./protocol.component.html",
  styleUrls: ["./protocol.component.css"]
})
export class ProtocolComponent implements OnInit {
  @ViewChild("loadingRef")
  loader: ElementRef;
  protocols: Array<IProtocol> = [];
  searchFilter: IMailSearch = {
    page: 1,
    items: 25
  };
  constructor(
    public commonService: CommonService,
    public protocolService: ProtocolService
  ) {}

  ngOnInit() {
    this.checkToken();
  }

  checkToken() {
    let token = getToken();
    if (!token) {
      this.showOrHideLoading(true);
      this.commonService.doLogin(loginUserDetails).subscribe(data => {
        token = data["headers"].get("x-final-url");
        token = token.split("=").pop();
        setToken(token);
        this.getProtocolsList();
      });
    } else {
      this.getProtocolsList();
    }
  }

  getProtocolsList() {
    this.showOrHideLoading(true);
    this.protocolService.getProtocolsList().subscribe(data => {
      console.log(data);
      this.protocols = data;
      this.protocols.forEach(protocol => {
        protocol.protocolDate = moment(protocol.protocolDate).format(
          "MMM DD, YYYY"
        );
      });
      this.showOrHideLoading(false);
    });
  }

  showOrHideLoading(isShow) {
    if (isShow) {
      jQuery("#loader_modal").modal("show");
    } else {
      jQuery("#loader_modal").modal("hide");
    }
  }

  sortProjects(type) {
    console.log(type);
  }

  deleteProtocol(id) {
    showConfirmDialog(
      "Are you sure",
      "Do you want to delete protocol",
      "warning",
      isConfirm => {
        console.log(isConfirm);
        if (isConfirm) {
          this.protocolService.deleteProtocol(id).subscribe(data => {
            console.log(data);
          });
        }
      }
    );

    // const isConfirm = confirm("Do you want to delete protocol");
    // if (isConfirm) {
    //   this.protocolService.deleteProtocol(id).subscribe(data => {
    //     console.log(data);
    //   });
    // }
  }
}

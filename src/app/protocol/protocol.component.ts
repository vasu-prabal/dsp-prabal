import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import {
  getToken,
  setToken,
  showConfirmDialog,
  showOrHideLoading
} from "../common";
import { CommonService } from "../common.service";
import { loginUserDetails } from "../constants";
import { ProtocolService } from "./protocol.service";
import { IProtocol, ISearch, IMailSearch } from "../home/home-modal";
import * as moment from "moment";
import { CreateProtocolComponent } from "../create-protocol/create-protocol.component";
import { CreateButtonComponent } from "../create-button/create-button.component";

declare var jQuery: any;
@Component({
  selector: "app-protocol",
  templateUrl: "./protocol.component.html",
  styleUrls: ["./protocol.component.css"]
})
export class ProtocolComponent implements OnInit {
  @ViewChild(CreateButtonComponent)
  createButton: CreateButtonComponent;
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
      showOrHideLoading(true);
      this.commonService.doLogin(loginUserDetails).subscribe(
        data => {
          token = data["sessionId"];
          // token = data["headers"].get("x-final-url");
          // token = token.split("=").pop();
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
    this.protocolService.getProtocolsList().subscribe(
      data => {
        console.log(data);
        this.protocols = data;
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

    // const isConfirm = confirm("Do you want to delete protocol");
    // if (isConfirm) {
    //   this.protocolService.deleteProtocol(id).subscribe(data => {
    //     console.log(data);
    //   });
    // }
  }

  editProtocol(id) {
    this.createButton.createProtocol.editProtocol(id);
  }
}

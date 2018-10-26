import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { getToken, setToken } from "../common";
import { CommonService } from "../common.service";
import { loginUserDetails } from "../constants";
import { ProtocolService } from "./protocol.service";

declare var jQuery: any;
@Component({
  selector: "app-protocol",
  templateUrl: "./protocol.component.html",
  styleUrls: ["./protocol.component.css"]
})
export class ProtocolComponent implements OnInit {
  @ViewChild("loadingRef")
  loader: ElementRef;
  constructor(
    public commonService: CommonService,
    public protocolService: ProtocolService
  ) {}

  ngOnInit() {
    // this.checkToken();
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
}

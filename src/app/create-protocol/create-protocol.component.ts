import { Component, OnInit } from "@angular/core";
import { IProtocol } from "../home/home-modal";

declare var jQuery;

@Component({
  selector: "app-create-protocol",
  templateUrl: "./create-protocol.component.html",
  styleUrls: [
    "../create-study/create-study.component.css",
    "./create-protocol.component.css"
  ]
})
export class CreateProtocolComponent implements OnInit {
  newProtocol: IProtocol = {};
  constructor() {}

  ngOnInit() {}

  openCreateProtocolDialog() {
    this.newProtocol = {};
    jQuery("#create_protocol_wizard").smartWizard({
      theme: "circles",
      useURLhash: false
    });

    jQuery("#create_protocol_dialog")
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }
}

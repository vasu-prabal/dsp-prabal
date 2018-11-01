import { Component, OnInit, ViewChild } from "@angular/core";
import { CreateProtocolComponent } from "../create-protocol/create-protocol.component";

@Component({
  selector: "app-create-button",
  templateUrl: "./create-button.component.html",
  styleUrls: ["./create-button.component.css"]
})
export class CreateButtonComponent implements OnInit {
  @ViewChild(CreateProtocolComponent)
  createProtocol: CreateProtocolComponent;
  constructor() {}

  ngOnInit() {}

}

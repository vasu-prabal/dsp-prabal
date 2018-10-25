import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IScript } from "../home/home-modal";

declare var jQuery: any;
@Component({
  selector: "app-create-script",
  templateUrl: "./create-script.component.html",
  styleUrls: ["./create-script.component.css"]
})
export class CreateScriptComponent implements OnInit {
  @ViewChild("createScript")
  myModal: ElementRef;
  newScript: IScript = {};
  constructor() {}

  ngOnInit() {}

  openCreateScriptDialog() {
    this.newScript = {};
    jQuery(this.myModal.nativeElement)
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  addNewScript() {
    console.log(this.newScript);
  }
}

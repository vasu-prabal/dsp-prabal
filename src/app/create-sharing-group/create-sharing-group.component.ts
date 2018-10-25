import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { INewSharingGroup } from "../home/home-modal";

declare var jQuery: any;
@Component({
  selector: "app-create-sharing-group",
  templateUrl: "./create-sharing-group.component.html",
  styleUrls: ["./create-sharing-group.component.css"]
})
export class CreateSharingGroupComponent implements OnInit {
  @ViewChild("createSharingGroup")
  myModal: ElementRef;
  newSharingGroup: INewSharingGroup = {};
  constructor() {}

  ngOnInit() {}

  openCreateSHaringGroupDialog() {
    this.newSharingGroup = {};
    jQuery(this.myModal.nativeElement)
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  addNewSharingGroup() {
    console.log(this.newSharingGroup);
  }
}

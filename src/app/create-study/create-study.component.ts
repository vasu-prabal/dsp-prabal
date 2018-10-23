import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { IStudy } from "../home/home-modal";

declare var jQuery: any;
@Component({
  selector: "app-create-study",
  templateUrl: "./create-study.component.html",
  styleUrls: ["./create-study.component.css"]
})
export class CreateStudyComponent implements OnInit {
  @ViewChild("createStudy")
  myModal: ElementRef;
  newStudy: IStudy = {};
  dropZone: HTMLElement;
  constructor() {}

  ngOnInit() {
    this.dropZone = document.getElementById("dropZone");
    this.dropZone = document.getElementById("dropZone");
    this.dropZone.ondrop = function(e) {
      e.preventDefault();
      console.log(e.dataTransfer.files);
      jQuery(e.target).removeClass("drop");
    };

    this.dropZone.ondragover = function(e) {
      jQuery(e.target).addClass("drop");
      return false;
    };

    this.dropZone.ondragleave = function(e) {
      jQuery(e.target).removeClass("drop");
      return false;
    };
  }

  openCreateStudyDialog() {
    this.newStudy = {};
    jQuery("#smartwizard").smartWizard({
      theme: "circles"
    });
    jQuery(this.myModal.nativeElement)
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  addNewStudy() {
    console.log(this.newStudy);
  }
}

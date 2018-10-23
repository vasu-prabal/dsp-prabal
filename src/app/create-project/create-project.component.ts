import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Project } from "../home/interfaces";
declare var jQuery: any;
@Component({
  selector: "app-create-project",
  templateUrl: "./create-project.component.html",
  styleUrls: ["./create-project.component.css"]
})
export class CreateProjectComponent implements OnInit {
  @ViewChild("createProject")
  myModal: ElementRef;
  newProject: Project = {
    id: undefined,
    name: "",
    area: "",
    laboratory: "",
    modified: "",
    owner: ""
  };
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

  openCreateProjectDialog() {
    this.newProject = {};
    jQuery(this.myModal.nativeElement)
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  addNewProject() {
    console.log(this.newProject);
  }
}

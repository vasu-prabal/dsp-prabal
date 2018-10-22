import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { HomeService } from "./home.service";
import { Project } from "./interfaces";
declare var jQuery: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @ViewChild("createProject")
  myModal: ElementRef;
  mailsList: Project[];
  newProject: Project = {
    id: undefined,
    name: "",
    area: "",
    laboratory: "",
    modified: "",
    owner: ""
  };
  dropZone = document.getElementById("dropZone");
  constructor(public homeService: HomeService) {}

  ngOnInit() {
    this.getMailsList();
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

  getMailsList() {
    this.mailsList = this.homeService.getMailsList();
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

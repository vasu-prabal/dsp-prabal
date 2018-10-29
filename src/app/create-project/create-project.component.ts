import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { IProject, IProjectColumns } from "../home/home-modal";
import { HomeService } from "../home/home.service";
import { showOrHideLoading } from "../common";

declare var jQuery: any;
@Component({
  selector: "app-create-project",
  templateUrl: "./create-project.component.html",
  styleUrls: ["./create-project.component.css"]
})
export class CreateProjectComponent implements OnInit {
  @ViewChild("createProject")
  myModal: ElementRef;
  newProject: IProject = {
    id: undefined,
    name: "",
    area: "",
    laboratory: "",
    modified: "",
    owner: ""
  };
  dropZone: HTMLElement;
  constructor(public homeService: HomeService) {}

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

    jQuery("#createProject").on("show.bs.modal", event => {
      this.getUsersList();
    });

    // jQuery("#projects_name").typeahead({
    //   afterSelect: function(obj) {
    //     console.log(obj);
    //   },
    //   source: [
    //     { id: 1, name: "John" },
    //     { id: 2, name: "Alex" },
    //     { id: 3, name: "Terry" }
    //   ],
    //   templates: {
    //     empty: function(context) {
    //       //  console.log(1) // put here your code when result not found
    //       jQuery(".tt-dataset").text("No Results Found");
    //     }
    //   }
    //   // ajax: {
    //   //   url: "/path/to/source",
    //   //   timeout: 500,
    //   //   displayField: "title",
    //   //   triggerLength: 1,
    //   //   method: "get",
    //   //   loadingClass: "loading-circle",
    //   //   preDispatch: function (query) {
    //   //     // showLoadingMask(true);
    //   //     return {
    //   //       search: query
    //   //     }
    //   //   },
    //   //   preProcess: function (data) {
    //   //     // showLoadingMask(false);
    //   //     if (data.success === false) {
    //   //       // Hide the list, there was some error
    //   //       return false;
    //   //     }
    //   //     // We good!
    //   //     return data.mylist;
    //   //   }
    //   // }
    // });
  }

  getUsersList() {
    showOrHideLoading(false);
    this.homeService.getUsersList().subscribe(data => {
      console.log(data);
      showOrHideLoading(false);
    });
  }

  openCreateProjectDialog() {
    this.newProject = {};
    jQuery(this.myModal.nativeElement)
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  addNewProject() {
    console.log(this.newProject);
    jQuery(this.myModal.nativeElement).modal("hide");
  }
}

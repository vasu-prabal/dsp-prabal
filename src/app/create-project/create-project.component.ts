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
    this.dropZone.ondrop = e => {
      e.preventDefault();
      console.log(e.dataTransfer.files);
      this.addAttachments(e.dataTransfer.files);
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
  }

  getUsersList() {
    showOrHideLoading(false);
    this.homeService.getUsersList().subscribe(data => {
      console.log(data);
      jQuery("#emails_input").typeahead({
        afterSelect: function(obj) {
          console.log(obj);
        },
        source: data,
        displayText: function(item) {
          return `${item.name} <${item.email}>`;
        },
        templates: {
          empty: function(context) {
            jQuery(".tt-dataset").text("No Results Found");
          }
        }
      });
      showOrHideLoading(false);
    });
  }

  addAttachments(files) {
    console.log(files);
    const fileDetails = {
      filename: files[0].name,
      sizeInBytes: files[0].size
    };
    this.homeService.getUploadFileId(fileDetails).subscribe(data => {
      console.log(data);
      this.homeService
        .getUploadFilePath(data.attachmentId)
        .subscribe(pathResp => {
          this.homeService
            .getUploadSingleFilePath({ objectName: pathResp.destinationPath })
            .subscribe(singlePathResp => {
              const uploadUrl = decodeURIComponent(singlePathResp.signedUrl);
              this.homeService
                .uploadFile(uploadUrl, files[0], pathResp.destinationPath)
                .subscribe(uploadResponse => {
                  console.log("uploaded ..........");
                });
            });
        });
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

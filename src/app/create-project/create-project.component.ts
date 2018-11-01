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
  users: Array<Object> = [
    { id: 1, name: "John", fullName: "John <john@a.com>" },
    { id: 2, name: "Alex", fullName: "Alex <alex@a.com>" },
    { id: 3, name: "Terry", fullName: "Terry <terry@a.com>" }
  ];
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
      this.getLabItems();
    });
  }

  getLabItems() {
    showOrHideLoading(true);
    this.homeService.getLabItems().subscribe((data: any) => {
      console.log(data);
    });
  }

  getUsersList() {
    showOrHideLoading(true);
    this.homeService.getUsersList().subscribe((data: Array<Object>) => {
      console.log(data);
      const userData = data.map(x => {
        const obj = {
          name: `${x["name"]} <${x["email"]}>`,
          userName: x["name"],
          email: x["email"],
          id: x["id"],
          displayText: `${x["name"]} ${x["email"]}`
        };
        return obj;
      });
      jQuery("#emails_input").typeahead({
        afterSelect: function(obj) {
          console.log(obj);
        },
        source: userData,
        displayText: function(item) {
          console.log(item.displayText);
          return item.displayText;
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
        .getUploadFilePath(data["attachmentId"])
        .subscribe(pathResp => {
          this.homeService
            .getUploadSingleFilePath({
              objectName: pathResp["destinationPath"]
            })
            .subscribe(singlePathResp => {
              const uploadUrl = decodeURIComponent(singlePathResp["signedUrl"]);
              this.homeService
                .uploadFile(uploadUrl, files[0], pathResp["destinationPath"])
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

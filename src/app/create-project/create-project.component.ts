import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { IProject, IProjectColumns, IProjectsUser } from "../home/home-modal";
import { HomeService } from "../home/home.service";
import { showOrHideLoading, showToastMessage } from "../common";
import { CommonService } from "../common.service";

declare var jQuery: any;
@Component({
  selector: "app-create-project",
  templateUrl: "./create-project.component.html",
  styleUrls: ["./create-project.component.css"]
})
export class CreateProjectComponent implements OnInit {
  @ViewChild("createProject")
  myModal: ElementRef;
  users: Array<Object> = [];
  newProject: IProject = {};
  dropZone: HTMLElement;
  projectUsers: Array<IProjectsUser> = [];

  coll = {};

  constructor(
    public homeService: HomeService,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    this.dropZone = document.getElementById("dropZone");
    this.dropZone = document.getElementById("dropZone");
    this.dropZone.ondrop = e => {
      e.preventDefault();
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
      // console.log(data);
    });
  }

  getUsersList() {
    showOrHideLoading(true);
    this.homeService.getUsersList().subscribe((data: Array<Object>) => {
      const userData = data.map(x => {
        const obj = {
          name: `${x["name"]} <${x["email"]}>`,
          userName: x["name"],
          email: x["email"],
          id: x["id"]
        };
        return obj;
      });
      this.users = userData;
      showOrHideLoading(false);
    });
  }

  addAttachments(files) {
    const fileDetails = {
      filename: files[0].name,
      sizeInBytes: files[0].size
    };
    this.homeService.getUploadFileId("project", fileDetails).subscribe(data => {
      this.homeService
        .getUploadFilePath("project", data["attachmentId"])
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
                  // console.log("uploaded ..........");
                });
            });
        });
    });
  }

  openCreateProjectDialog() {
    this.newProject = {};
    this.getUsersList();
    this.projectUsers = [];
    jQuery("#general-tab").click();
    jQuery(this.myModal.nativeElement)
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  addNewProject() {
    this.newProject.colleagues = {};
    // this.projectUsers.forEach(element => {
    //   const id = element.id.toString();
    //   this.newProject.colleagues[id] = element.allowCreateStudies
    //     ? element.allowCreateStudies
    //     : false;
    // });
    console.log(this.projectUsers);
    console.log(this.newProject);
    showOrHideLoading(true);
    delete this.newProject.lab;
    delete this.newProject.description;
    this.homeService.addNewProject(this.newProject).subscribe(
      (data: any) => {
        if (data.errorMessage === null) {
          showToastMessage(`Project Created Successfully`, "success");
          jQuery(this.myModal.nativeElement).modal("hide");
          this.commonService.projectAdded();
        } else {
          showToastMessage(
            `${
              data.errorMessage ? data.errorMessage : "Failed to create project"
            }`,
            "error"
          );
        }
        showOrHideLoading(false);
      },
      error => {
        showToastMessage(`Failed to create project`, "error");
        showOrHideLoading(false);
      }
    );
  }

  addUsersToProject() {
    if (this.newProject.persons !== null) {
      this.projectUsers.push(this.newProject.persons);

      this.users = this.users.filter(
        x => x["id"] !== this.newProject.persons.id
      );
      jQuery(".project-user-list .ng-clear-wrapper").click();
      setTimeout(() => {
        this.newProject.persons = null;
      });
    }
  }

  removeProjectUser(index) {
    const userToRemove = this.projectUsers[index];
    this.projectUsers.splice(index, 1);
    this.users.push(userToRemove);
  }
}

import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import {
  IStudy,
  ISpeciesList,
  ITechTypes,
  IVendorList,
  IProject,
  IProtocol
} from "../home/home-modal";
import { showOrHideLoading } from "../common";
import { CreateStudyService } from "../create-study/create-study.service";
import { HomeService } from "../home/home.service";
import { ProtocolService } from "../protocol/protocol.service";

declare var jQuery: any;
@Component({
  selector: "app-create-study",
  templateUrl: "./create-study.component.html",
  styleUrls: ["./create-study.component.css"]
})
export class CreateStudyComponent implements OnInit {
  newStudy: IStudy = {};
  dropZone: HTMLElement;
  species: Array<ISpeciesList> = [];
  techTypes: Array<ITechTypes> = [];
  vendors: Array<IVendorList> = [];
  projects: Array<IProject> = [];
  protocols: Array<IProtocol> = [];
  fileUploadSize: number;

  constructor(
    public createStudyService: CreateStudyService,
    public homeService: HomeService,
    public protocolService: ProtocolService
  ) {}

  ngOnInit() {
    this.dropZone = document.getElementById("study_drop_zone");

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
    jQuery("#study_creation_wizard")
      .smartWizard({
        theme: "circles",
        showStepURLhash: false,
        keyNavigation: false,
        buttonOrder: ["finish", "next", "prev"],
        toolbarSettings: {
          toolbarExtraButtons: [
            jQuery("<button></button>")
              .text("Finish")
              .addClass("btn btn-info")
              .on("click", () => {
                this.addNewStudy();
              })
          ]
        }
      })
      .on("showStep", (e, anchorObject, stepNumber, stepDirection) => {
        if (jQuery("button.sw-btn-next").hasClass("disabled")) {
          jQuery(".sw-btn-group-extra").show();
        } else {
          jQuery(".sw-btn-group-extra").hide();
        }
      });
  }

  openCreateStudyDialog() {
    this.getSpecies();
    this.getTechType();
    this.getProjects();
    this.getMaxFileUploadSize();
    this.getProtocolsList();
    this.newStudy = {};
    jQuery("#study_creation_wizard").smartWizard("reset");
    jQuery(".sw-btn-group-extra").hide();
    jQuery("#create_study_dialog")
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  getProtocolsList() {
    this.protocolService.getProtocolsList().subscribe(data => {
      this.protocols = data;
    });
  }

  getMaxFileUploadSize() {
    showOrHideLoading(true);
    this.homeService
      .getMaxFileSizeUpload("experiment")
      .subscribe((data: any) => {
        this.fileUploadSize = data.value / (1024 * 1024); // converting bytes to MB
      });
  }

  addAttachments(files) {
    const fileDetails = {
      filename: files[0].name,
      sizeInBytes: files[0].size
    };
    this.homeService
      .getUploadFileId("experiment", fileDetails)
      .subscribe(data => {
        this.homeService
          .getUploadFilePath("experiment", data["attachmentId"])
          .subscribe(pathResp => {
            this.homeService
              .getUploadSingleFilePath({
                objectName: pathResp["destinationPath"]
              })
              .subscribe(singlePathResp => {
                const uploadUrl = decodeURIComponent(
                  singlePathResp["signedUrl"]
                );
                this.homeService
                  .uploadFile(uploadUrl, files[0], pathResp["destinationPath"])
                  .subscribe(uploadResponse => {
                    // console.log("uploaded ..........");
                  });
              });
          });
      });
  }

  getProjects() {
    showOrHideLoading(true);
    this.createStudyService.getProjects().subscribe((data: any) => {
      this.projects = data;
      showOrHideLoading(false);
    });
  }

  getSpecies() {
    showOrHideLoading(true);
    this.createStudyService.getSpecies().subscribe((data: any) => {
      this.species = data;
      showOrHideLoading(false);
    });
  }

  getTechType() {
    showOrHideLoading(true);
    this.createStudyService
      .getTechTypes()
      .subscribe((data: Array<ITechTypes>) => {
        this.techTypes = data;
        showOrHideLoading(false);
      });
  }

  getVendorsList() {
    if (this.newStudy.technology !== null) {
      showOrHideLoading(true);
      this.createStudyService
        .getVendorsList(this.newStudy.technology)
        .subscribe((data: Array<IVendorList>) => {
          this.vendors = data;
          showOrHideLoading(false);
        });
    } else {
      this.vendors = [];
      this.newStudy.vendor = undefined;
    }
  }

  addNewStudy() {
    showOrHideLoading(true);
    setTimeout(() => {
      jQuery("#create_study_dialog").modal("hide");
      showOrHideLoading(false);
    }, 1000);
  }
}

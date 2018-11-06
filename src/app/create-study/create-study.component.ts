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
import { forkJoin } from "rxjs";

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
    this.getModalDropDownValues();
    this.newStudy = {};
    jQuery("#study_creation_wizard").smartWizard("reset");
    jQuery(".sw-btn-group-extra").hide();
    jQuery("#create_study_dialog")
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  getModalDropDownValues() {
    const filter = {
      asc: false,
      filterQuery: "",
      items: 25,
      labId: 0,
      page: 1,
      sortingField: "modified"
    };
    showOrHideLoading(true);
    const species = this.createStudyService.getSpecies();
    const techTypes = this.createStudyService.getTechTypes();
    const projects = this.homeService.getProjectsList("all", filter);
    const maxFileUploadSize = this.homeService.getMaxFileSizeUpload(
      "experiment"
    );
    const protocolList = this.protocolService.getProtocolsList();
    // const instrumentList = this.createStudyService.getInstrumentList();
    forkJoin(
      species,
      techTypes,
      projects,
      maxFileUploadSize,
      protocolList,
      // instrumentList
    ).subscribe(
      results => {
        this.species = results[0];
        this.techTypes = results[1];
        this.projects = results[2].items;
        this.fileUploadSize = results[3]["value"] / (1024 * 1024);
        this.protocols = results[4];
        showOrHideLoading(false);
      },
      error => {
        showOrHideLoading(false);
      }
    );
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
    const filter = {
      asc: false,
      filterQuery: "",
      items: 25,
      labId: 0,
      page: 1,
      sortingField: "modified"
    };
    // this.createStudyService.getProjects
    this.homeService.getProjectsList("all", filter).subscribe((data: any) => {
      this.projects = data.items;
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

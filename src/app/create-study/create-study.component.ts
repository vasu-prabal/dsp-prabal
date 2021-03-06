import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { IStudy, IProject, IProtocol } from "../home/home-modal";
import { showOrHideLoading, showToastMessage } from "../common";
import { CreateStudyService } from "../create-study/create-study.service";
import { HomeService } from "../home/home.service";
import { ProtocolService } from "../protocol/protocol.service";
import { forkJoin } from "rxjs";
import { IInstrument, IExperimentType } from "./study-modal";
import { IAttributeModal } from "../instruments/instruments-modal";

declare var jQuery: any;
@Component({
  selector: "app-create-study",
  templateUrl: "./create-study.component.html",
  styleUrls: ["./create-study.component.css"]
})
export class CreateStudyComponent implements OnInit {
  newStudy: IStudy = {};
  dropZone: HTMLElement;
  species: Array<IAttributeModal> = [];
  techTypes: Array<IAttributeModal> = [];
  vendors: Array<IAttributeModal> = [];
  projects: Array<IProject> = [];
  protocols: Array<IProtocol> = [];
  fileUploadSize: number;
  instrumentModels: Array<IAttributeModal> = [];
  instruments: Array<IInstrument> = [];
  experimentTypes: Array<IExperimentType> = [];
  errorMessage = "";
  isFileExists = false;
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
      .on("leaveStep", (e, anchorObject, stepNumber, stepDirection) => {
        if (stepDirection === "forward") {
          if (stepNumber === 0) {
            const isError = this.validateStudyStep1();
            if (isError) {
              this.errorMessage = "";
            }
            return isError ? false : true;
          } else if (stepNumber === 1) {
            const isError = this.validateStudyStep2();
            if (isError) {
              this.errorMessage = "";
            }
            return isError ? false : true;
          }
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

  validateStudyStep1() {
    let isError = false;
    if (!this.newStudy.name) {
      isError = true;
      this.errorMessage = "Please add study name";
    } else if (!this.newStudy.project) {
      isError = true;
      this.errorMessage = "Please select project";
    } else if (!this.newStudy.species) {
      isError = true;
      this.errorMessage = "Please select the species";
    } else if (!this.newStudy.allPrograms && !this.newStudy.selectedPrograms) {
      isError = true;
      this.errorMessage = "Please select the program";
    } else if (!this.newStudy.technology) {
      isError = true;
      this.errorMessage = "Please select technology";
    } else if (!this.newStudy.vendor) {
      isError = true;
      this.errorMessage = "Please select vendor";
    } else if (
      this.instrumentModels.length === 0 ||
      this.instruments.length === 0
    ) {
      isError = true;
      this.errorMessage =
        "No instrument model for selected Technology Type and Vendor. Request a new model from Administrator";
    }
    return isError;
  }

  validateStudyStep2() {
    let isError = false;
    if (!this.newStudy.instrumentModel) {
      isError = true;
      this.errorMessage = "Please select instrument model";
    } else if (!this.newStudy.instrument) {
      isError = true;
      this.errorMessage = "Please select instrument";
    } else if (!this.newStudy.protocol) {
      isError = true;
      this.errorMessage = "Please select protocol";
    } else if (!this.newStudy.experimentType) {
      isError = true;
      this.errorMessage = "Please select experiment type";
    } else if (!this.newStudy.lc) {
      isError = true;
      this.errorMessage = "Please select 2D/LC";
    } else if (!this.newStudy.labeled) {
      isError = true;
      this.errorMessage = "Please select labeled";
    } else if (!this.isFileExists) {
      isError = true;
      this.errorMessage = "No files for selected instrument and species";
    }
    return isError;
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
    const projectsFilter = {
      asc: false,
      filterQuery: "",
      items: 25,
      labId: 0,
      page: 1,
      sortingField: "modified"
    };
    const filter = {
      page: 1,
      items: 25,
      asc: false,
      sortingField: "protocolDate"
    };
    showOrHideLoading(true);
    const species = this.createStudyService.getSpecies();
    const techTypes = this.createStudyService.getTechTypes();
    const projects = this.homeService.getProjectsList("all", projectsFilter);
    const maxFileUploadSize = this.homeService.getMaxFileSizeUpload(
      "experiment"
    );
    const protocolList = this.protocolService.getProtocolsList(filter);
    const experimentTypes = this.createStudyService.getExperimentTypes();
    forkJoin(
      species,
      techTypes,
      projects,
      maxFileUploadSize,
      protocolList,
      experimentTypes
    ).subscribe(
      results => {
        this.species = results[0];
        this.techTypes = results[1];
        this.projects = results[2].items;
        this.fileUploadSize = results[3]["value"] / (1024 * 1024);
        this.protocols = results[4].items;
        this.experimentTypes = results[5];
        showOrHideLoading(false);
      },
      error => {
        showOrHideLoading(false);
      }
    );
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

  getVendorsList() {
    if (this.newStudy.technology !== null) {
      showOrHideLoading(true);
      this.createStudyService
        .getVendorsList(this.newStudy.technology)
        .subscribe((data: Array<IAttributeModal>) => {
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

  checkInstrumentModalExists() {
    const selectedTechnology = this.techTypes.find(
      x => x.id === this.newStudy.technology
    );
    if (selectedTechnology) {
      showOrHideLoading(true);
      this.createStudyService
        .checkInstrumentModalExists(
          this.newStudy.species,
          this.newStudy.technology,
          selectedTechnology.name,
          this.newStudy.vendor
        )
        .subscribe(
          data => {
            showOrHideLoading(false);
            this.instrumentModels = data;
            if (this.instrumentModels.length > 0) {
              this.getInstrumentsList(this.instrumentModels[0].id);
            } else {
              this.errorMessage =
                "No instrument model for selected Technology Type and Vendor. Request a new model from Administrator";
              this.instruments = [];
            }
          },
          error => {
            console.log(error);
            showOrHideLoading(false);
          }
        );
    }
  }

  getInstrumentsList(instrumentModelId) {
    showOrHideLoading(true);
    this.createStudyService.getInstrumentsList(instrumentModelId).subscribe(
      instrumentsData => {
        this.instruments = instrumentsData;
        if (this.instruments.length === 0) {
          this.errorMessage =
            "No instrument model for selected Technology Type and Vendor. Request a new model from Administrator";
        } else {
          this.errorMessage = "";
        }
        showOrHideLoading(false);
        this.newStudy.instrument = null;
      },
      error => {
        this.instruments = [];
        showOrHideLoading(false);
        this.newStudy.instrument = null;
      }
    );
  }

  checkFileExists() {
    if (this.newStudy.instrument && this.newStudy.instrumentModel) {
      this.createStudyService
        .checkFileExists(
          this.newStudy.instrument,
          this.newStudy.instrumentModel,
          this.newStudy.species
        )
        .subscribe(
          data => {
            this.isFileExists = data["value"];
          },
          error => {
            this.errorMessage = "No files for selected instrument and species";
          }
        );
    }
  }
}

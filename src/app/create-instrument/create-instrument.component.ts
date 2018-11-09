import { Component, OnInit } from "@angular/core";
import { CreateStudyService } from "../create-study/create-study.service";
import { CreateInstrumentService } from "./create-instrument.service";
import { forkJoin } from "rxjs";
import { IAttributeModal, IInstrument } from "../instruments/instruments-modal";
import { showOrHideLoading, showToastMessage } from "../common";
import { THROW_IF_NOT_FOUND } from "@angular/core/src/di/injector";
import { CommonService } from "../common.service";

declare var jQuery;
@Component({
  selector: "app-create-instrument",
  templateUrl: "./create-instrument.component.html",
  styleUrls: ["./create-instrument.component.css"]
})
export class CreateInstrumentComponent implements OnInit {
  technologyList: Array<IAttributeModal> = [];
  vendorList: Array<IAttributeModal> = [];
  newInstrumentModel: IInstrument = {};
  instrumentTypes: Array<IAttributeModal> = [];
  extensions: Array<string> = [];
  constructor(
    public studyService: CreateStudyService,
    public createInstrumentService: CreateInstrumentService,
    public commonService: CommonService
  ) {}

  ngOnInit() {}

  openCreateInstrumentDialog() {
    this.newInstrumentModel = {};
    jQuery("#create_instrument_dialog")
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
    this.getModalValues();
  }

  getModalValues() {
    showOrHideLoading(true);
    const techTypes = this.studyService.getTechTypes();
    const vendorTypes = this.createInstrumentService.getVendorsList();
    forkJoin(techTypes, vendorTypes).subscribe(
      results => {
        this.technologyList = results[0];
        this.vendorList = results[1];
        showOrHideLoading(false);
      },
      error => {
        showOrHideLoading(false);
        console.log(error);
      }
    );
  }

  getInstrumentTypes() {
    if (
      this.newInstrumentModel.technologyType &&
      this.newInstrumentModel.vendor
    ) {
      showOrHideLoading(true);
      const instrumentTypes = this.createInstrumentService.getInstrumentTypesByTechnologyTypeAndVendor(
        this.newInstrumentModel.technologyType.id,
        this.newInstrumentModel.vendor.id
      );
      const extensions = this.createInstrumentService.getVendorExtensionsByTechnologyTypeAndVendor(
        this.newInstrumentModel.technologyType.id,
        this.newInstrumentModel.vendor.id
      );
      this.instrumentTypes = [
        {
          id: undefined,
          name: "None",
          unspecified: false
        }
      ];
      this.extensions = [];
      this.newInstrumentModel.instrumentType = null;
      this.newInstrumentModel.extensions = null;
      forkJoin(instrumentTypes, extensions).subscribe(
        results => {
          if (results[0]["value"].length > 0) {
            this.instrumentTypes = results[0]["value"];
          }
          this.newInstrumentModel.instrumentType = this.instrumentTypes[0];
          this.extensions = results[1]["value"];
          this.newInstrumentModel.extensions = this.extensions;
          showOrHideLoading(false);
        },
        error => {
          showOrHideLoading(false);
          console.log(error);
        }
      );
    }
  }

  removeExtension(index) {
    this.newInstrumentModel.extensions.splice(index, 1);
  }

  addNewInstrumentModel() {
    if (
      !this.newInstrumentModel.technologyType ||
      !this.newInstrumentModel.technologyType.name
    ) {
      showToastMessage("Please select technology type", "error");
    } else if (
      !this.newInstrumentModel.vendor ||
      !this.newInstrumentModel.vendor.name
    ) {
      showToastMessage("Please select vendor", "error");
    } else if (
      !this.newInstrumentModel.instrumentType ||
      !this.newInstrumentModel.instrumentType.name
    ) {
      showToastMessage("Please select instrument type", "error");
    } else if (
      !this.newInstrumentModel.extensions ||
      this.newInstrumentModel.extensions.length === 0
    ) {
      showToastMessage("At least one extension is required", "error");
    } else if (!this.newInstrumentModel.name) {
      showToastMessage("Please add name", "error");
    } else {
      const modelId = this.newInstrumentModel.id
        ? this.newInstrumentModel.id
        : undefined;
      this.createInstrumentService
        .checkInstrumentModelNameExists(
          modelId,
          this.newInstrumentModel.vendor.id,
          this.newInstrumentModel.name
        )
        .subscribe(
          uniqueDataResp => {
            if (uniqueDataResp["value"]) {
              const obj = {
                extensions: this.newInstrumentModel.extensions,
                instrumentType: this.newInstrumentModel.instrumentType.name,
                name: this.newInstrumentModel.name,
                technologyType: this.newInstrumentModel.technologyType.name,
                vendor: this.newInstrumentModel.vendor.name
              };
              showOrHideLoading(true);
              this.createInstrumentService.createInstrumentModel(obj).subscribe(
                data => {
                  jQuery("#create_instrument_dialog").modal("hide");
                  showToastMessage(
                    "Instrument model added successfully",
                    "success"
                  );
                  this.commonService.instrumentModelAdded();
                },
                error => {
                  showToastMessage(
                    "Error while creating instrument model",
                    "error"
                  );
                  console.log(error);
                }
              );
            } else {
              showToastMessage(
                "Name already exists please try another one",
                "error"
              );
            }
          },
          error => {
            showOrHideLoading(false);
            showToastMessage("Error while validating unique name", "error");
          }
        );
    }
  }
}

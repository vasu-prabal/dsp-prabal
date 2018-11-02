import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { IProtocol } from "../home/home-modal";
import { CreateProtocolService } from "./create-protocol.service";
import { showToastMessage, showOrHideLoading } from "../common";
import { CommonService } from "../common.service";

declare var jQuery;

@Component({
  selector: "app-create-protocol",
  templateUrl: "./create-protocol.component.html",
  styleUrls: [
    "../create-study/create-study.component.css",
    "./create-protocol.component.css"
  ]
})
export class CreateProtocolComponent implements OnInit {
  @Output()
  createProtocolEvent = new EventEmitter();
  newProtocol: IProtocol = {};
  collisionEnergySlider: any;
  constructor(
    public service: CreateProtocolService,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    jQuery("#create_protocol_wizard")
      .smartWizard({
        theme: "circles",
        selected: 0,
        useURLhash: false,
        buttonOrder: ["finish", "next", "prev"],
        onLeaveStep: function() {
          console.log("on leave");
          return false;
        },
        toolbarSettings: {
          toolbarExtraButtons: [
            jQuery("<button></button>")
              .text("Finish")
              .addClass("btn btn-info")
              .on("click", () => {
                this.createProtocol();
              })
          ]
        }
      })
      .on("leaveStep", (e, anchorObject, stepNumber, stepDirection) => {
        if (
          stepNumber === 0 &&
          stepDirection === "forward" &&
          !this.newProtocol.protocolName
        ) {
          showToastMessage("Please add protocol name", "error");
          return false;
        }
        // console.log(this.newProtocol);
      })
      .on("showStep", (e, anchorObject, stepNumber, stepDirection) => {
        if (jQuery("button.sw-btn-next").hasClass("disabled")) {
          jQuery(".sw-btn-group-extra").show();
        } else {
          jQuery(".sw-btn-group-extra").hide();
        }
        console.log(this.newProtocol);
        if (
          stepNumber === 1 &&
          stepDirection === "forward" &&
          !this.newProtocol.protocolName
        ) {
          showToastMessage("Please add protocol name", "error");
          return false;
        }
      });
  }

  openProtocolDialog() {
    this.collisionEnergySlider = jQuery("#collisionEnergy")
      .slider()
      .on("slide", slideEvt => {
        this.newProtocol.collisionEnergy = slideEvt.value;
      })
      .on("change", slideEvt => {
        this.newProtocol.collisionEnergy = slideEvt.value.newValue;
      });

    if (this.newProtocol.collisionEnergy) {
      this.newProtocol.collisionEnergy = Number(
        this.newProtocol.collisionEnergy.toString().replace("%", "")
      );
      this.collisionEnergySlider.slider(
        "setValue",
        this.newProtocol.collisionEnergy
      );
    }

    jQuery("#create_protocol_wizard").smartWizard("reset");
    jQuery(".sw-btn-group-extra").hide();
    jQuery("#create_protocol_dialog")
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  openCreateProtocolDialog() {
    this.newProtocol = {};
    this.openProtocolDialog();
  }

  createProtocol() {
    console.log(this.newProtocol);
    const obj = this.newProtocol;
    obj.chromatographicDimension = Number(obj.chromatographicDimension);
    obj.diaMultiplexing = Boolean(obj.diaMultiplexing);
    obj.protocolDocumentName = obj.documentName;
    showOrHideLoading(true);
    if (this.newProtocol.id) {
      this.service.updateProtocol(obj).subscribe(
        data => {
          console.log(data);
          showOrHideLoading(false);
          jQuery("#create_protocol_dialog").modal("hide");
          this.commonService.protocolAdded();
          showToastMessage("Protocol updated successfully", "success");
        },
        error => {
          showOrHideLoading(false);
          showToastMessage(
            "Error while getting updating the protocol",
            "error"
          );
        }
      );
    } else {
      obj.ddaTopN = "Top 10";
      obj.diaIms = true;
      obj.protocolDate = new Date();
      this.service.createProtocol(obj).subscribe(
        data => {
          console.log(data);
          showOrHideLoading(false);
          jQuery("#create_protocol_dialog").modal("hide");
          this.commonService.protocolAdded();
          showToastMessage("Protocol added successfully", "success");
        },
        error => {
          showOrHideLoading(false);
          showToastMessage("Error while getting adding the protocol", "error");
        }
      );
    }
  }

  editProtocol(id) {
    console.log("protocol edit", id);
    showOrHideLoading(true);
    this.service.getProtocol(id).subscribe(
      data => {
        if (data["successMessage"] === "Success") {
          this.newProtocol = data["details"];
          this.openProtocolDialog();
        } else {
          showToastMessage("Error while getting protocol details", "error");
        }
        console.log(data);
        showOrHideLoading(false);
      },
      error => {
        showOrHideLoading(false);
      }
    );
  }
}

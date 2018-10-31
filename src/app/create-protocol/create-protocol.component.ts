import { Component, OnInit } from "@angular/core";
import { IProtocol } from "../home/home-modal";
import { CreateProtocolService } from "./create-protocol.service";
import { showToastMessage } from "../common";

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
  newProtocol: IProtocol = {};
  collisionEnergySlider: any;
  constructor(public service: CreateProtocolService) {}

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
        // console.log(this.newProtocol);
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

  openCreateProtocolDialog() {
    this.newProtocol = {};
    this.collisionEnergySlider = jQuery("#collisionEnergy")
      .slider()
      .on("slide", slideEvt => {
        this.newProtocol.collisionEnergy = slideEvt.value;
      })
      .on("change", slideEvt => {
        this.newProtocol.collisionEnergy = slideEvt.value.newValue;
      });

    jQuery("#create_protocol_wizard").smartWizard("reset");
    jQuery(".sw-btn-group-extra").hide();
    jQuery("#create_protocol_dialog")
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  createProtocol() {
    console.log(this.newProtocol);
    this.service.createProtocol(this.newProtocol).subscribe(data => {
      console.log(data);
    });
  }

  updateProtocol() {
    const obj = {
      id: 2,
      protocolName: "CPTAC-CompRef-Global2 update",
      protocolDate: "2017-03-06T00:00:00.000Z",
      documentName: "PNNL_CPTAC_LCMSProtocol_CompRef",
      startingAmount: 3,
      startingAmountUom: "mg",
      enrichmentStrategy: "Proteome, Phosphoproeome, Glycoproteome, Acetylome",
      labelingStrategy: "label-free",
      labelFreeQuantitation: "ion counting",
      labeledQuantitation: "TMT-tag",
      isobaricLabelingReagent: "TMT11",
      digestionReagent: "Trypsin",
      alkylationReagent: "Iodoacetamide",
      chromatographyDimensionsCount: 1,
      fractionsProducedCount: 24,
      chromatographyType: "RPLC, bRPLC, SCX",
      chromatographicDimension: 1,
      columnType: "C18",
      amountOnColumn: 0.75,
      amountOnColumnUom: "ug",
      columnLength: 70,
      columnLengthUom: "cm",
      columnInnerDiameter: 75,
      columnInnerDiameterUom: "um",
      particleSize: 3,
      particleSizeUom: "um",
      particleType: "Phenomenex Jupiter C18",
      gradientLength: 100,
      gradientLengthUom: "min",
      protocolDocumentName: "PNNL_CPTAC_LCMSProtocol_CompRef",
      protocolType: "Orbitrap Mass Spectrometry Protocol",
      acquisitionType: "DDA",
      instrumentMake: "Thermo Fisher",
      instrumentModel: "QExactive HF",
      instrumentSerialNumber: "Exactive Series slot",
      dissociationType: "high-energy collision-induced dissociation (HCD)",
      ms1Resolution: 30000,
      ms2Resolution: 7500,
      ddaTopN: "Top 10",
      diaMultiplexing: false,
      diaIms: true,
      collisionEnergy: "45%"
    };
    this.service.updateProtocol(obj).subscribe(data => {
      console.log(data);
    });
  }
}

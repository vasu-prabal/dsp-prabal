import { Component, OnInit } from "@angular/core";
import { IProtocol } from "../home/home-modal";
import { CreateProtocolService } from "./create-protocol.service";

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
  constructor(public service: CreateProtocolService) {}

  ngOnInit() {}

  openCreateProtocolDialog() {
    this.newProtocol = {};
    jQuery("#create_protocol_wizard").smartWizard({
      theme: "circles",
      useURLhash: false
    });

    jQuery("#create_protocol_dialog")
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");

  }

  createProtocol() {
    const obj = {
      protocolName: "CPTAC-CompRef-Global",
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
    this.service.createProtocol(obj).subscribe(data => {
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

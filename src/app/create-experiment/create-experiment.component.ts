import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IExperiment } from "../home/home-modal";
declare var jQuery: any;
@Component({
  selector: "app-create-experiment",
  templateUrl: "./create-experiment.component.html",
  styleUrls: [
    "./create-experiment.component.css",
    "../create-study/create-study.component.css"
  ]
})
export class CreateExperimentComponent implements OnInit {
  @ViewChild("createExperiment")
  myModal: ElementRef;
  newExperiment: IExperiment = {};
  dropZone: HTMLElement;
  constructor() {}

  ngOnInit() {
    this.dropZone = document.getElementById("experiment_drop_zone");
    this.dropZone.ondrop = function(e) {
      e.preventDefault();
      console.log(e.dataTransfer.files);
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
  }

  openCreateExperimentDialog() {
    this.newExperiment = {};
    jQuery("#experimentWizard").smartWizard({
      theme: "circles",
      showStepURLhash: false
    });
    jQuery(this.myModal.nativeElement)
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  addNewExperiment() {
    console.log(this.newExperiment);
  }
}

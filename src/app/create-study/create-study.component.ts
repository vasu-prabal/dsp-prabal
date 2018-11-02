import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import {
  IStudy,
  ISpeciesList,
  ITechTypes,
  IVendorList,
  IProject
} from "../home/home-modal";
import { showOrHideLoading } from "../common";
import { CreateStudyService } from "../create-study/create-study.service";

declare var jQuery: any;
@Component({
  selector: "app-create-study",
  templateUrl: "./create-study.component.html",
  styleUrls: ["./create-study.component.css"]
})
export class CreateStudyComponent implements OnInit {
  @ViewChild("createStudy")
  myModal: ElementRef;
  newStudy: IStudy = {};
  dropZone: HTMLElement;
  species: Array<ISpeciesList>;
  techTypes: Array<ITechTypes>;
  vendors: Array<IVendorList>;
  projects: Array<IProject>;

  constructor(public createStudyService: CreateStudyService) {}

  ngOnInit() {
    this.dropZone = document.getElementById("study_drop_zone");

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

  openCreateStudyDialog() {
    this.getSpecies();
    this.getTechType();
    this.getProjects();

    this.newStudy = { select: "" };
    jQuery("#smartwizard").smartWizard({
      theme: "circles"
    });

    jQuery(this.myModal.nativeElement)
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  }

  getProjects() {
    showOrHideLoading(true);
    this.createStudyService.getProjects().subscribe((data: any) => {
      console.log(data);
      this.projects = data;
      showOrHideLoading(false);
    });
  }

  getSpecies() {
    showOrHideLoading(true);
    this.createStudyService.getSpecies().subscribe((data: any) => {
      console.log(data);
      this.species = data;
      showOrHideLoading(false);
    });
  }

  getTechType() {
    showOrHideLoading(true);
    this.createStudyService
      .getTechTypes()
      .subscribe((data: Array<ITechTypes>) => {
        console.log(data);
        this.techTypes = data;
        showOrHideLoading(false);
      });
  }

  getVendorsList() {
    console.log(this.newStudy.technology);
    if (this.newStudy.technology !== null) {
      showOrHideLoading(true);
      this.createStudyService
        .getVendorsList(this.newStudy.technology)
        .subscribe((data: Array<IVendorList>) => {
          console.log(data);
          this.vendors = data;
          showOrHideLoading(false);
        });
    } else {
      this.vendors = [];
      this.newStudy.vendor = undefined;
    }
  }

  addNewStudy() {
    console.log(this.newStudy);
  }
}

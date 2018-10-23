import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { Project } from "./interfaces";
declare var jQuery: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mailsList: Project[];
  newProject: Project = {
    id: undefined,
    name: "",
    area: "",
    laboratory: "",
    modified: "",
    owner: ""
  };
  constructor(public homeService: HomeService) {}

  ngOnInit() {
    this.getMailsList();
  }

  getMailsList() {
    this.mailsList = this.homeService.getMailsList();
  }
}

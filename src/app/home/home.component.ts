import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { Hero } from "./interfaces";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mailsList: Hero[];
  constructor(public homeService: HomeService) {}

  ngOnInit() {
    this.getMailsList();
  }

  getMailsList() {
    this.mailsList = this.homeService.getMailsList();
  }
}

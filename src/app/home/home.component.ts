import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { IProject, IMailSearch, ILogin } from "./home-modal";
import { getToken, setToken } from "../common";
declare var jQuery: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mailsList: IProject[];
  newProject: IProject = {
    id: undefined,
    name: "",
    area: "",
    laboratory: "",
    modified: "",
    owner: ""
  };
  searchFilter: IMailSearch = {
    page: 1,
    items: 25
  };
  constructor(public homeService: HomeService) {}

  ngOnInit() {
    // const token = getToken();
    // setToken("JSESSIONID=A70A91EE767C374D6C765315D3F3EFCF");
    // if (!token) {
    //   const login: ILogin = {
    //     j_username: "demo-user",
    //     j_password: "pwd",
    //     _spring_security_remember_me: "on"
    //   };
    //   this.homeService.doLogin(login).subscribe(data => {
    //     console.log(data);
    //   });
    // }
    this.getMailsList();
  }

  getMailsList() {
    // this.homeService.getMailsList().subscribe(data => {
    //   console.log(data);
    // });
    this.mailsList = this.homeService.getMailsList();
  }
}

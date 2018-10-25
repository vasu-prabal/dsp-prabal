import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

declare var jQuery: any;
@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"]
})
export class LoadingComponent implements OnInit {
  @ViewChild("loadingDialog")
  myModal: ElementRef;
  constructor() {}

  ngOnInit() {}

  showOrHideLoading(isShow) {
    jQuery(this.myModal.nativeElement)
      .modal({ backdrop: "static", keyboard: false })
      .modal(isShow ? "show" : "hide");
  }
}

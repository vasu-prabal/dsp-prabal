import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { HomeService } from "./home/home.service";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { CreateProjectComponent } from "./create-project/create-project.component";
import { CreateStudyComponent } from "./create-study/create-study.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { LoadingComponent } from "./loading/loading.component";
import { CreateScriptComponent } from "./create-script/create-script.component";
import { CreateSharingGroupComponent } from "./create-sharing-group/create-sharing-group.component";
import { InlineSVGModule } from "ng-inline-svg";
import { CreateExperimentComponent } from "./create-experiment/create-experiment.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { ProtocolComponent } from "./protocol/protocol.component";
import { CreateProtocolComponent } from "./create-protocol/create-protocol.component";
import { CreateButtonComponent } from "./create-button/create-button.component";
import { UploadButtonComponent } from "./upload-button/upload-button.component";
import { CreateProtocolService } from "./create-protocol/create-protocol.service";
import { RequestInterceptor } from "./http-interceptor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StudiesComponent } from "./studies/studies.component";
import { InstrumentsComponent } from "./instruments/instruments.component";
import { CreateInstrumentComponent } from "./create-instrument/create-instrument.component";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SideMenuComponent,
    CreateProjectComponent,
    CreateStudyComponent,
    LoadingComponent,
    CreateScriptComponent,
    CreateSharingGroupComponent,
    CreateExperimentComponent,
    ProtocolComponent,
    CreateProtocolComponent,
    CreateButtonComponent,
    UploadButtonComponent,
    StudiesComponent,
    InstrumentsComponent,
    CreateInstrumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,
    InlineSVGModule.forRoot()
  ],
  providers: [
    HomeService,
    CreateProtocolService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

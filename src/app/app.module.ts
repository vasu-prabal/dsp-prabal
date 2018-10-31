import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { HomeService } from "./home/home.service";
import { HttpModule } from "@angular/http";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { CreateProjectComponent } from "./create-project/create-project.component";
import { CreateStudyComponent } from "./create-study/create-study.component";
import { HttpClientModule } from "@angular/common/http";
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
    UploadButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    InlineSVGModule.forRoot()
  ],
  providers: [HomeService, CreateProtocolService],
  bootstrap: [AppComponent]
})
export class AppModule {}

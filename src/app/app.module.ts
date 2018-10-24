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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SideMenuComponent,
    CreateProjectComponent,
    CreateStudyComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule {}

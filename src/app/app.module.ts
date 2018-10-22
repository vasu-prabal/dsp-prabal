import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { HomeService } from "./home/home.service";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpModule],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule {}

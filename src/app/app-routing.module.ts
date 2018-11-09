import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProtocolComponent } from "./protocol/protocol.component";
import { StudiesComponent } from "./studies/studies.component";
import { InstrumentsComponent } from "./instruments/instruments.component";

const routes: Routes = [
  { path: "", redirectTo: "/projects/all", pathMatch: "full" },
  { path: "projects/:type", component: HomeComponent },
  { path: "protocols", component: ProtocolComponent },
  { path: "studies/:type", component: StudiesComponent },
  { path: "instruments-models", component: InstrumentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

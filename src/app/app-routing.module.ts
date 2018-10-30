import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProtocolComponent } from "./protocol/protocol.component";

const routes: Routes = [
  { path: "", redirectTo: "/projects/all", pathMatch: "full" },
  { path: "projects/:type", component: HomeComponent },
  { path: "protocols", component: ProtocolComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

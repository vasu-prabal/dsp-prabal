import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { IProject } from "./home-modal";
@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor(public http: Http) {}

  getMailsList(): IProject[] {
    return [
      {
        id: 111,
        name: "CPTAC Retrospective",
        owner: "Ratna Thangudu",
        laboratory: "Clinical Proteomic",
        area: "Proteomics",
        modified: "Jul 19, 2018"
      },
      {
        id: 108,
        name: "Test",
        owner: "Ratna Thangudu",
        laboratory: "ESAC",
        area: "Proteomics",
        modified: "Jul 29, 2018"
      },
      {
        id: 1,
        name: "Personal Genome Project",
        owner: "Pavel Kaplin",
        laboratory: "First chorus lab",
        area: "Technology",
        modified: "Jul 20, 2018"
      },
      {
        id: 2,
        name: "Drive for biomas to feed synthetic organisms",
        owner: "Pavel Kaplin",
        laboratory: "First chorus lab",
        area: "Synthetic Biology",
        modified: "Jul 20, 2018"
      },
      {
        id: 3,
        name: "Small Molecule screen",
        owner: "Pavel Kaplin",
        laboratory: "First chorus lab",
        area: "Technology science",
        modified: "Jul 20, 2018"
      }
    ];
  }
}

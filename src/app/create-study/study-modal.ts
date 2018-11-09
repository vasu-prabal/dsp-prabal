import { IAttributeModal } from "../instruments/instruments-modal";

export interface IInstrument {
  creator: number;
  id: number;
  lab: number;
  name: string;
  serial: string;
}

export interface IExperimentType extends IAttributeModal {
  allowLabels: boolean;
  allowed2DLC: boolean;
}

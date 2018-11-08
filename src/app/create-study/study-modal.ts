export interface IInstrumentModel {
  id: number;
  name: string;
  unspecified: boolean;
}
export interface IInstrument {
  creator: number;
  id: number;
  lab: number;
  name: string;
  serial: string;
}

export interface IExperimentType extends IInstrumentModel {
  allowLabels: boolean;
  allowed2DLC: boolean;
}

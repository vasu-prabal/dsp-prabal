import { IAttributeModal } from "../instruments/instruments-modal";

export interface IProjectLab {
  id?: number | string;
  instruments?: Array<IProjectInstrument>;
  labHead?: number;
  name?: string;
}

export interface IProjectInstrument {
  creator?: number;
  id?: number;
  lab?: number;
  name?: string;
  serial?: string;
}

export interface IProjectInstrumentVendor {
  fileUploadExtensions?: Array<IProjectFileUploadExtension>;
  folderArchiveUploadSupport?: boolean;
  id?: number;
  multipleFiles?: boolean;
  name?: string;
  studyTypeItem?: IAttributeModal;
}

export interface IProjectFileUploadExtension {
  name?: string;
  zip?: string;
  additionalExtensions?: Object;
}

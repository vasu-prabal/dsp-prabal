import { ISearchFilter } from "../home/home-modal";

export interface IInstrument {
  additionalFiles: boolean;
  extensions: Array<string>;
  folderArchiveSupport: boolean;
  id: number;
  instrumentType: IAttributeModal;
  instrumentsCount: number;
  name: string;
  technologyType: IAttributeModal;
  vendor: IAttributeModal;
}

export interface IAttributeModal {
  id: number;
  name: string;
  unspecified: boolean;
}

export interface IInstrumentList extends ISearchFilter {
  items: Array<IInstrument>;
}

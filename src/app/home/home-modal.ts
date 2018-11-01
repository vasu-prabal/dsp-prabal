export interface IProject {
  id?: number;
  enableBlog?: boolean;
  description?: string;
  persons?: string;
  sendNotification?: string;
  columns?: IProjectColumns;
  name?: string;
  owner?: string;
  laboratory?: string;
  area?: string;
  modified?: string;
}

export interface IProjectColumns {
  id?: number;
  name?: string;
  owner?: string;
  laboratory?: string;
  area?: string;
  modified?: string;
}

export interface IScript {
  name?: string;
  type?: string;
  laboratory?: string;
  description?: string;
  scriptText?: string;
  parameterName?: string;
  parameterType?: string;
  parameterDefaultValue?: string;
}

export interface IStudy {
  name?: string;
  project?: string;
  species?: string;
  allPrograms?: boolean;
  select?: string;
  technology?: string;
  vendor?: string;
  description?: string;
}

export interface ISearch {
  page: number;
  items: number;
}

export interface IMailSearch extends ISearch {
  sortingField?: string;
  asc?: boolean;
  filterQuery?: string;
  labId?: number;
  modified?: string;
  userId?: string;
}

export interface ILogin {
  j_username: string;
  j_password: string;
  _spring_security_remember_me: string;
}

export interface IMailsList {
  items: Array<IProject>;
  itemsCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface ISpeciesList {
  name: string;
  unspecified: boolean;
  id: number;
}

export interface ITechTypes {
  name: string;
  unspecified: boolean;
  id: number;
}

export interface INewSharingGroup {
  persons?: string;
  name?: string;
}

export interface IExperiment {
  name?: string;
  project?: string;
  species?: string;
  allPrograms?: boolean;
  select?: string;
  technology?: string;
  vendor?: string;
  description?: string;
}

export interface IProtocol {
  id?: string;
  protocolName?: string;
  protocolDate?: string | Date;
  documentName?: string;
  startingAmount?: string;
  startingAmountUom?: string;
  enrichmentStrategy?: string;
  labelingStrategy?: string;
  labelFreeQuantitation?: string;
  labeledQuantitation?: string;
  isobaricLabelingReagent?: string;
  digestionReagent?: string;
  alkylationReagent?: string;
  chromatographyDimensionsCount?: string;
  fractionsProducedCount?: string;
  chromatographyType?: string;
  chromatographicDimension?: string | Number;
  columnType?: string;
  amountOnColumn?: string;
  amountOnColumnUom?: string;
  columnLength?: string;
  columnLengthUom?: string;
  columnInnerDiameter?: string;
  columnInnerDiameterUom?: string;
  particleSize?: string;
  particleSizeUom?: string;
  particleType?: string;
  gradientLength?: string;
  gradientLengthUom?: string;
  protocolDocumentName?: string;
  protocolType?: string;
  acquisitionType?: string;
  instrumentMake?: string;
  instrumentModel?: string;
  instrumentSerialNumber?: string;
  dissociationType?: string;
  ms1Resolution?: string;
  ms2Resolution?: string;
  ddaTopN?: string;
  diaMultiplexing?: string | boolean;
  diaIms?: string | boolean;
  collisionEnergy?: string | Number;
}

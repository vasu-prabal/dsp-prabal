import { ISearchFilter } from "../home/home-modal";

export interface IStudyModal {
  accessLevel?: string;
  analyzesCount?: number;
  billLab?: number;
  canArchive?: boolean;
  canUnarchive?: boolean;
  columns?: IStudyColumns;
  creator?: string;
  downloadAvailable?: boolean;
  downloadLink?: string;
  files?: string;
  hasUnArchiveDownloadOnlyRequest?: boolean;
  hasUnArchiveRequest?: boolean;
  id?: number;
  isAvailableForCopying?: boolean;
  isOwner?: boolean;
  lab?: IStudyLab;
  modified?: number;
  msChartsUrl?: string;
  name?: string;
  owner?: number;
  project?: string;
}

export interface IStudyColumns {
  files?: number;
  laboratory?: string;
  modified?: number | string;
  name?: string;
  owner?: string;
  project?: string;
}

export interface IStudyLab {
  id?: number;
  institutionUrl?: string;
  labHead?: number;
  laboratoryHeadName?: string;
  modified?: number;
  name?: string;
}

export interface IStudyList extends ISearchFilter {
  items?: Array<IStudyModal>;
}

export interface IProject {
  id?: number;
  enableBlog?: boolean;
  description?: string;
  persons?: string;
  sendNotification?: string;
  columns: IProjectColumns;
}

export interface IProjectColumns {
  name?: string;
  owner?: string;
  laboratory?: string;
  area?: string;
  modified?: string;
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
  asc?: string;
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

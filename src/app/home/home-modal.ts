export interface IProject {
  id?: number;
  name?: string;
  owner?: string;
  laboratory?: string;
  area?: string;
  modified?: string;
  enableBlog?: boolean;
  description?: string;
  persons?: string;
  sendNotification?: string;
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

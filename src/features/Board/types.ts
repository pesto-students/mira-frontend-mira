import { Iproject, Iuser } from 'app/types';

export interface Iboard {
  title: string;
  project: Iproject | null;
  loading: boolean;
  error: string;
  allUsers: string[];
}

export interface Ifilters {
  searchTerm: string;
  userIds: Array<any>;
  myOnly: boolean;
  recent: boolean;
}

export interface IProjectBoardProps {
  project: any;
  fetchProject: any;
  updateLocalProjectIssues: any;
}

export interface IProjectBoardFiltersProps {
  projectUsers: Iuser[];
  defaultFilters: any;
  filters: any;
  mergeFilters: any;
}

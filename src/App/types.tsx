export interface Icard {
  _id: string;
  title: string;
  description: string;
  id: string;
  project?: Iproject;
  createdBy?: string;
  assignee?: string;
  estimatedDate?: Date;
  prioroity?: string;
  status?: string;
  reporter?: Iuser;
}

export interface Iproject {
  name: string;
  description: string;
  logo: string;
  users: Iuser[];
  admins: Iadmin[];
  id: string;
}

export interface Iuser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
}

export interface Iadmin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
}

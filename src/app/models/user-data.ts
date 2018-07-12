export class UserDetails {
  firstName: string = '';
  lastName: string = '';
  studentID: string = '';
  major: string = '';
  categories: Array<Object>;
  leadershipCategory: LeadershipCategory;
}

export class LeadershipCategory {
  club: Array<'string'> = [];
  position: Array<'string'> = [];
  from: Array<'string'> = [];
  to: Array<'string'> = [];
  image: Array<'string'> = [];
}

export class UserCategories {
  leadership: Boolean = false;
  club: Boolean = false;
  development: Boolean = false;
  wellness: Boolean = false;
  campus: Boolean = false;
  community: Boolean = false;
  global: Boolean = false;
  academic: Boolean = false;
  official: Boolean = false;
  peer: Boolean = false;
  athletics: Boolean = false;
  creative: Boolean = false;
  award: Boolean = false;
  other: Boolean = false;
  otherText: string = '';
}
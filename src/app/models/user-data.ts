export class UserDetails {
  firstName: string = '';
  lastName: string = '';
  studentID: string = '';
  major: string = '';
  leadershipCategory: LeadershipCategory;
}

export class LeadershipCategory {
  selected: Boolean = false;
  club: Array<'string'> = [];
  position: Array<'string'> = [];
  from: Array<'string'> = [];
  to: Array<'string'> = [];
  image: Array<'string'> = [];
}
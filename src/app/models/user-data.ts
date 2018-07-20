export class UserDetails {
  firstName: string = '';
  lastName: string = '';
  studentID: string = '';
  major: string = '';
  categories: Array<Boolean>;

  leadershipCategory: EventEntry[];
  clubCategory: EventEntry[];
  devCategory: EventEntry[];
  wellnessCategory: EventEntry[];
  campusCategory: EventEntry[];
  communityCategory: EventEntry[];
  globalCategory: EventEntry[];
  academicCategory: EventEntry[];
  officialCategory: EventEntry[];
  peerCategory: EventEntry[];
  athleticsCategory: EventEntry[];
  creativeCategory: EventEntry[];
  awardCategory: EventEntry[];
  otherCategory: EventEntry[];
}

export class EventEntry {
  title: String = "";
  position: String = "";
  from: String = "";
  to: String = "";
  image: Object = {};
}

export class UserCategories {
  leadership: Boolean = false;
  club: Boolean = false;
  dev: Boolean = false;
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
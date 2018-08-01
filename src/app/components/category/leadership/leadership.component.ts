import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title, Position, Type } from '../../../interfaces/formFields';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'hut-leadership',
  templateUrl: './leadership.component.html',
  styleUrls: ['./leadership.component.scss'],
})
export class LeadershipComponent implements OnInit {
  @Input() group: FormGroup;
  @Output() eventRemoved = new EventEmitter<any>();

  constructor() {}

  get leadershipCategory(): FormArray {
    return this.group.get('leadershipCategory') as FormArray;
  };

  removeEvent(index, category) {
    const currentEntry = {
      index,
      category
    }
    this.eventRemoved.emit(currentEntry);
  }

  onFileChange(event, entryIndex, category) {
    if(event.target.files && event.target.files.length) {
      const file = event.target.files;
      category.controls[entryIndex].controls['image'].setValue(file[0]);
    }
  }

  onTitleChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['title'].setValue(text);
    }
  }

  onPositionChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['position'].setValue(text);
    }
  }

  onTypeChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['type'].setValue(text);
    }
  }

  titleList: Title[] = [
    { title: "ASPiRE (Association of Scientific Progress in Research and Engineering)" },
    { title:"Enigma, IBA" },
    { title:"Habib Adventure Society" }, 
    { title:"Habib Anime Club" },
    { title:"Habib Arts Society" },
    { title:"Habib Feminist Collective" },
    { title:"Habib Publications Society " },
    { title:"HU Araish-e-Khayal Club" },
    { title:"HU Artificial Intelligence and Robotics Club" },
    { title:"HU Attack of the Planes" },
    { title:"HU Bazm e Aqeedat" },
    { title:"HU Brain.Hack() Club" },
    { title:"HU Code.Play()" },
    { title:"HU DigilAto Club" },
    { title:"HU Dream Stage" },
    { title:"HU Enterpreneurship Society" },
    { title:"HU Eventos" },
    { title:"HU Human Library Project" },
    { title:"HU Investment Society" },
    { title:"HU Mankahat" },
    { title:"HU Mathematics Symposium" },
    { title:"HU Moseequi Club" },
    { title:"HU Peer Mentorship Program" },
    { title:"HU Physics and Astronomy Club" },
    { title:"HU Pi Phi Society" },
    { title:"HU Programming Workshop" },
    { title:"HU Project Uraan" },
    { title:"HU Public Speaking Society" },
    { title:"HU Purple Lion Production" },
    { title:"HU RAQS Club" },
    { title:"HU Roar Poetry Club" },
    { title:"HU Runway Radio" },
    { title:"HU SerVe Club" },
    { title:"HU Society for Sustainibility" },
    { title:"HU Sports & Recreation" },
    { title:"HU Sports Olympiad" },
    { title:"HU Student Government" },
    { title:"HU Student Programming Board" },
    { title:"HU Tachi Club" },
    { title:"HU Women in Computer Science & Engineering" },
    { title:"HU-ACES (Habib University Autonomous, Connected, Electric, Shared)" },
    { title:"HU-iSciM Curriculum Planning Committee Member" },
    { title:"HUMUN" },
    { title:"IEEE Habib University Student Chapter" },
    { title:"International Association of Physics" },
    { title:"Kashf-Student Literary Magazine" },
    { title:"LEADS-Leadership,Entrepreneuship & Development Society" },
    { title:"Lunch Buddy Project" },
    { title:"Mehardaar School of Arts" },
    { title:"Mind Boggle (Board Games)" },
    { title:"Mulaqaat, Student-Led Talk Series" },
    { title:"OMICRON, HU-Science Olympiad" },
    { title:"Purple Lion Production" },
    { title:"ROAR" },
    { title:"StudySpacepk" },
    { title:"TedX Habib University" },
    { title:"The Open Discussion Forum, Pakistan" }
  ];

  positionList: Position[] = [
    { position: "Activist" },
    { position: "Advisor" },
    { position: "Chair" },
    { position: "Chief Executive Officer" },
    { position: "Chief Financial Officer & Sponsorship Advisor" },
    { position: "Chief Learning Officer" },
    { position: "Chief Operation Officer" },
    { position: "Co-founder" },
    { position: "Communication Officer" },
    { position: "Communications Director" },
    { position: "Co-President" },
    { position: "Deputy Director" },
    { position: "Design Director" },
    { position: "Design Officer" },
    { position: "Director of Creatives" },
    { position: "Director of Logistics" },
    { position: "Director of Marketing" },
    { position: "Director of Outreach" },
    { position: "Director of Parliamentary" },
    { position: "Director of Social Affairs" },
    { position: "Director Registration" },
    { position: "Directors Logistics" },
    { position: "Event Director" },
    { position: "Event Manager" },
    { position: "Events Photographer" },
    { position: "Executive Coordinator" },
    { position: "Executive Director" },
    { position: "Executive Officer" },
    { position: "Founder" },
    { position: "Head of Communication" },
    { position: "Head of Cooperate & Sponsorship" },
    { position: "Head of Design" },
    { position: "Head of Operations" },
    { position: "Head of Registrations" },
    { position: "Logistics Manager" },
    { position: "Management Officer" },
    { position: "Managing Editor" },
    { position: "Marketing Executive" },
    { position: "Marketing Manager" },
    { position: "Media Coordinator" },
    { position: "Member" },
    { position: "Membership Chair" },
    { position: "Moderator" },
    { position: "Operational Manager" },
    { position: "Outreach Officer" },
    { position: "President" },
    { position: "Registration Officer" },
    { position: "Secretary" },
    { position: "Senate Member" },
    { position: "Senator" },
    { position: "Senior Vice President" },
    { position: "Social Media Manager" },
    { position: "Student Ambassador" },
    { position: "Team Lead" },
    { position: "Technicality Officer" },
    { position: "Treasurer" },
    { position: "Vice President" },
    { position: "Web Master" }
  ];

  typeList: Type[] = [
    { type: "Internal" },
    { type: "External" }
  ];

  titleControl = new FormControl();
  titleFilteredOptions: Observable<Title[]>;

  positionControl = new FormControl();
  positionFilteredOptions: Observable<Position[]>;

  typeControl = new FormControl();
  typeFilteredOptions: Observable<Type[]>;

  ngOnInit() 
  {
    this.titleFilteredOptions = this.titleControl.valueChanges
      .pipe(
        startWith<string | Title>(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this._filterTitle(title) : this.titleList.slice())
      );

    this.positionFilteredOptions = this.positionControl.valueChanges
      .pipe(
        startWith<string | Position>(''),
        map(value => typeof value === 'string' ? value : value.position),
        map(position => position ? this._filterPosition(position) : this.positionList.slice())
      );

    this.typeFilteredOptions = this.typeControl.valueChanges
      .pipe(
        startWith<string | Type>(''),
        map(value => typeof value === 'string' ? value : value.type),
        map(type => type ? this._filterType(type) : this.typeList.slice())
      );
  }

  private _filterTitle(category: string): Title[] {
    const filterValue = category.toLowerCase();
    return this.titleList.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterPosition(category: string): Position[] {
    const filterValue = category.toLowerCase();
    return this.positionList.filter(option => option.position.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterType(category: string): Type[] {
    const filterValue = category.toLowerCase();
    return this.typeList.filter(option => option.type.toLowerCase().indexOf(filterValue) === 0);
  }
}

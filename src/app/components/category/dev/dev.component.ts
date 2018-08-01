import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title, Position, Kind } from '../../../interfaces/formFields';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'hut-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {
  @Input() group: FormGroup;
  @Output() eventRemoved = new EventEmitter<any>();

  constructor() {
  }

  onFileChange(event, entryIndex, category) {
    if(event.target.files && event.target.files.length) {
      const file = event.target.files;
      category.controls[entryIndex].controls['image'].setValue(file[0]);
    }
  }

  removeEvent(index, category) {
    const currentEntry = {
      index,
      category
    }
    this.eventRemoved.emit(currentEntry);
  }

  get devCategory(): FormArray {
    return this.group.get('devCategory') as FormArray;
  };

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

  onKindChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['kind'].setValue(text);
    }
  }

  titleList: Title[] = [
    { title: "Affinity Library" },
    { title: "Aga Khan Foundation, Tajikistan " },
    { title: "Aga Khan Rural Support System" },
    { title: "Aga Khan University" },
    { title: "AISEC, Karachi" },
    { title: "Applied Technology & Research Centre" },
    { title: "Berlitz Pakistan" },
    { title: "Bodhicetta Works" },
    { title: "British Council IELTS" },
    { title: "Butterfly Dreamer Network, Karachi" },
    { title: "Career Founders, Karachi" },
    { title: "CBO Subrang" },
    { title: "Charter for Compassion" },
    { title: "Chawla Clinic, Karachi" },
    { title: "Chitral Heritage & Environmental Protection Society" },
    { title: "Circle Women" },
    { title: "Circuit DRAFTFCB" },
    { title: "Code For Pakistan" },
    { title: "Creative Chaos" },
    { title: "Creative Unit Pvt. Ltd." },
    { title: "Cybernet, Karachi" },
    { title: "Data Communications & Control Pvt. Ltd, Karachi" },
    { title: "Dawn Newspaper" },
    { title: "Dora Gunsberger, SOAS, University of London" },
    { title: "Electro-Mechanical Branch, CAA,  Karachi " },
    { title: "Excelerate Private Ltd." },
    { title: "FM-91 Radio, Karachi" },
    { title: "FreeLance Workshop Developer" },
    { title: "French/German Film Festival" },
    { title: "Fuchsia Magazine" },
    { title: "Gasco Engineering Pvt. Ltd." },
    { title: "Hands, Karachi" },
    { title: "Haper's Ferry Job Corps" },
    { title: "Health Oriented Preventive Education" },
    { title: "Herald- Magazine" },
    { title: "Heritage, Karachi" },
    { title: "HeySuccess, Students Program Abroad" },
    { title: "HomeChef, Karachi" },
    { title: "HU Arzu Centre" },
    { title: "HU Career Services" },
    { title: "HU Centre for Pedagogical Excellence" },
    { title: "HU Coding BootCamp" },
    { title: "HU Computer Science Department" },
    { title: "HU Ehsas Center" },
    { title: "HU Film Studio" },
    { title: "HU Gym" },
    { title: "HU History Project" },
    { title: "HU HR Department" },
    { title: "HU ISciM Department" },
    { title: "HU IT Department" },
    { title: "HU Library" },
    { title: "HU MarComm" },
    { title: "HU Office of President" },
    { title: "HU Office of Student Life" },
    { title: "HU Online STEM Learning, MapleSoft" },
    { title: "HU Procurement Department" },
    { title: "HU Rahnumai: Nurturing Youth's Potential " },
    { title: "HU Resource Department" },
    { title: "HU Runway Radio" },
    { title: "HU School of Arts, Humanities & Social Sciences" },
    { title: "HU Talent Outreach, Promotion & Support Program" },
    { title: "HU Wellness Center" },
    { title: "HU Writing Centre" },
    { title: "IAL Saatchi & Saatchi" },
    { title: "Ignite Creativity, Karachi" },
    { title: "Ilad School, Karachi" },
    { title: "Imperial Connections Exhibit" },
    { title: "Indus Earth Trust" },
    { title: "Indus Motors, Karachi" },
    { title: "Indus Resource Centre, Karachi" },
    { title: "Institute of Rural Management, Sindh" },
    { title: "Integrated Dynamics, Karachi" },
    { title: "Interdisciplinary Development Research & Action Centre(IDRAC)" },
    { title: "Jhpiego-Johns Hopkins Affiliate" },
    { title: "Karachi Conference Foundation" },
    { title: "Karachi Innovation Lab" },
    { title: "KarachiScape" },
    { title: "K-Electric" },
    { title: "Khadija Kazi Ali Memorial High School- Summer Camp" },
    { title: "LuckyOne Mall, Karachi" },
    { title: "Lufthansa City Centre, Germany" },
    { title: "Luminative Solution, Karachi" },
    { title: "Mangobaaz" },
    { title: "Marvi Mazhar & Associates" },
    { title: "Maya's Closet" },
    { title: "Mediastudies, Asia" },
    { title: "MentHub" },
    { title: "Monitoring & Evaluation Cell, Planning & Development Department, Govt. of Sindh" },
    { title: "Nadir Toosy Photography" },
    { title: "Nest I/O" },
    { title: "New York University" },
    { title: "NOWPDP, Karachi" },
    { title: "NRF Engineering" },
    { title: "NuTrack (The Nest I/O)" },
    { title: "Organization for Educational Change" },
    { title: "Oxford University Press" },
    { title: "Pakistan Institute of Labor Education & Research (PILER)" },
    { title: "Pakistan Petroleum Ltd." },
    { title: "Participatory Village Development Program" },
    { title: "Pathfinder International" },
    { title: "Robin hood Army, Karachi " },
    { title: "Rolaak" },
    { title: "Rural Support Programmes Network" },
    { title: "Saath Chal, Student Initiative" },
    { title: "SABAQ Foundation" },
    { title: "Siemens Pakistan Engineering Company Ltd." },
    { title: "Sindh Exploration & Adventure Society" },
    { title: "SOC Films, Karachi" },
    { title: "SOS Village" },
    { title: "SpokenStage, Karachi" },
    { title: "Stanford StartX Ropazi, USA" },
    { title: "Strengthening Participatory Organization" },
    { title: "The History Project" },
    { title: "The Resource Collective" },
    { title: "The School of Writing, Karachi" },
    { title: "Training by First Response Initiative of Pakistan" },
    { title: "TrashIt-Entrepreneurship" },
    { title: "TV Global" },
    { title: "Unilever Pakistan" },
    { title: "Urban Resource Centre, Karachi" },
    { title: "USAID Pakistan" },
    { title: "Visual Arts Department, Karachi University" },
    { title: "War Against Rape, Pakistan" },
    { title: "Zeen(Cambridge Garment Industry)" }
  ];

  positionList: Position[] = [
    { position: "Administrative Assistant" },
    { position: "Ambassador" },
    { position: "Assistant Librarian" },
    { position: "Design Intern" },
    { position: "Development Intern" },
    { position: "Director" },
    { position: "External Curriculum Reviewer" },
    { position: "Graphic Designer" },
    { position: "Head of Execution" },
    { position: "Illustrator" },
    { position: "Incubatee" },
    { position: "Intern" },
    { position: "Operations Manager" },
    { position: "Organizer" },
    { position: "Outreach and Strategy Builder" },
    { position: "Photographer" },
    { position: "Quality Assurance Manager" },
    { position: "Reporter/Editor" },
    { position: "Research Assistant" },
    { position: "Social Media Associate" },
    { position: "Student Employee" },
    { position: "Teaching Assistant" },
    { position: "Trainer" },
    { position: "Wellness Peer" }
  ];

  kindList: Kind[] = [
    { kind: "Internal" },
    { kind: "External" }
  ];

  titleControl = new FormControl();
  titleFilteredOptions: Observable<Title[]>;

  positionControl = new FormControl();
  positionFilteredOptions: Observable<Position[]>;

  kindControl = new FormControl();
  kindFilteredOptions: Observable<Kind[]>;

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

    this.kindFilteredOptions = this.kindControl.valueChanges
      .pipe(
        startWith<string | Kind>(''),
        map(value => typeof value === 'string' ? value : value.kind),
        map(kind => kind ? this._filterKind(kind) : this.kindList.slice())
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

  private _filterKind(category: string): Kind[] {
    const filterValue = category.toLowerCase();
    return this.kindList.filter(option => option.kind.toLowerCase().indexOf(filterValue) === 0);
  }

}

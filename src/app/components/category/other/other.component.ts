import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title, Position, Type } from '../../../interfaces/formFields';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'hut-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {
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

  get otherCategory(): FormArray {
    return this.group.get('otherCategory') as FormArray;
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

  titleList: Title[] = [
    { title: "40-Day Workout Challenge" },
    { title: "Bahria University Olympiad, Karachi" },
    { title: "Bahria University, Programming Competition" }, 
    { title: "Baltit Academic Development Organization" },
    { title: "Bathisland Tennis Championship, Karachi" },
    { title: "Comic Awards" },
    { title: "Conversation with Gender Initiative Alliance" },
    { title: "COP in my City, Islamabad" }, 
    { title: "Data Analysis Workshop" },
    { title: "Design Thinking Workshop-Stanford School" },
    { title: "Design Workshop with World Bank & Sindh Education Foundation" },
    { title: "Ehsas Film Project" },
    { title: "Enigma, IBA Karachi" }, 
    { title: "First Response Initiative of Pakistan Training" },
    { title: "German Film Festival" },
    { title: "Girl in the River Documentary Screening" },
    { title: "Global IEEE Xtreme Programming Competition" },
    { title: "Hacktivision Workshop" }, 
    { title: "HU Big Data Workshop" },
    { title: "HU Lean Engineering Workshop" },
    { title: "HU Maple Workshop" },
    { title: "HU Posheeda Qadam-A Film on Violence Against Women" },
    { title: "HU Radar Development Workshop" }, 
    { title: "HU Sangat Workshop" },
    { title: "Hunza Gilgit Social Welfare Organization" },
    { title: "IEEE VoLT" },
    { title: "IEEE Xtreme Programming Competition" },
    { title: "International Club-Mount Mercy University Leadership and Skill Development Workshop, USA Washington DC" }, 
    { title: "International Water Conference by Hissar Foundation" },
    { title: "Introduction to Data Science Workshop" },
    { title: "Leadership and Skill Development Workshop, University of Utah, USA, Salt Lake City" },
    { title: "Leadership Summit" },
    { title: "Lean Engineering Workshop" }, 
    { title: "MAJU Mathematics Olympiad" },
    { title: "Mathematika, IBA" },
    { title: "Mulaaqaat, Student Led Talk Series" },
    { title: "National Digital Design Conference" },
    { title: "Nest I/O-Startup Weekend" }, 
    { title: "PeachTech Exchange" },
    { title: "Photographer Exhibition at T2F-Metropolis curated by Naila Mehmood" },
    { title: "Posheeda Qadam-Documentary Screening & Talk" },
    { title: "Power of Positive Thinking Workshop" },
    { title: "Predictive Analytics" }, 
    { title: "Probattle, IBA" },
    { title: "PROCOM, FAST University" },
    { title: "Secondary Teachers Education Program, Pakistan" },
    { title: "SHE LOVES TECH, Pakistan Competition" },
    { title: "She Loves TechGlobal Pitch Competition" }, 
    { title: "Silk Route Writing Workshop" },
    { title: "Soch K Bol - A Talk by Habib Feminist Collective" },
    { title: "Spacetime via Geometry by Dr. Babar Qureshi" },
    { title: "STA Tennis Championship" },
    { title: "Thallassaemia Blood Campaign" }, 
    { title: "The Art of Kathak" },
    { title: "The Nest I/O, Karachi" },
    { title: "Throw Ball Competition-IBA Sports Olympiad" },
    { title: "Traffic Signal Campaign with Gender Inclusivity" },
    { title: "Understanding Islam, Islamabad" }, 
    { title: "VolleyBall Olympiad, IBA" },
    { title: "Workshop Series on Design Thinking, Service Design, UI/UX,Design Research & Prototyping" }
  ];

  positionList: Position[] = [
    { position: "Chairperson" },
    { position: "Coordinator" },
    { position: "Outreach Manager" },
    { position: "Panelist" },
    { position: "Participant" },
    { position: "Photographer" },
    { position: "Player" },
    { position: "Presenter" },
    { position: "Runners-up" },
    { position: "Strategy Head" },
    { position: "Usher" },
    { position: "Vice Chair" },
    { position: "Volunteer" },
    { position: "Winner" }
  ];

  onTypeChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['type'].setValue(text);
    }
  }

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

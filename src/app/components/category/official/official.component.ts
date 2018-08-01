import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title, Position, Kind } from '../../../interfaces/formFields';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'hut-official',
  templateUrl: './official.component.html',
  styleUrls: ['./official.component.scss']
})
export class OfficialComponent implements OnInit {
  @Input() group: FormGroup;
  @Output() eventRemoved = new EventEmitter<any>();

  isRequired: boolean;
  uploadedFileName: string = "No file choosen";
  
  constructor() {
  }

  onFileChange(event, entryIndex, category) {
    if(event.target.files && event.target.files.length) {
      const file = event.target.files;
      category.controls[entryIndex].controls['image'].setValue(file[0]);
      this.uploadedFileName = file[0].name;
      this.isRequired = false;
    }
    else
    {
      this.uploadedFileName = "No file choosen";
      this.isRequired = true;
    }
  }

  removeEvent(index, category) {
    const currentEntry = {
      index,
      category
    }
    this.eventRemoved.emit(currentEntry);
  }

  get officialCategory(): FormArray {
    return this.group.get('officialCategory') as FormArray;
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

      if(text === "Internal")
      {
        this.isRequired = false;
      }
      else
      {
        this.isRequired = true;
      }
    }
  }

  titleList: Title[] = [
    { title: "Communication & Design Curriclum Review Board" },
    { title:"HU Committee for Café, Gym & Student Lounge" },
    { title:"HU Road to Graduation Committee" }, 
    { title:"HU Student Committee-Prevention of Sexual Harrassment" },
    { title:"HU Student Ethos Committee" },
    { title:"HU Student Finance Committee" },
    { title:"HU Student Life Committee" }
  ];

  positionList: Position[] = [
    { position: "Lead" },
    { position: "Student Representative" },
    { position: "Member" }
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

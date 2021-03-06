import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title, Position, Kind } from '../../../interfaces/formFields';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'hut-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.scss']
})
export class AcademicComponent implements OnInit {
  @Input() group: FormGroup;
  @Output() eventRemoved = new EventEmitter<any>();

  isRequired: boolean;
  uploadedFileName: string = "No file choosen";

  constructor() { }

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

  get academicCategory(): FormArray {
    return this.group.get('academicCategory') as FormArray;
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
    { title: "5th International Conference on Sustainable Development- Rome, Italy " },
    { title: "5th International Karachi Conference " },
    { title: "Akhbari Cartoons, Habib University" },
    { title: "Annual IBA Conference on social Sciences and Humanties" },
    { title: "Conference on Cultural Identities in Transformation, Baltit Academic Development Association" },
    { title: "Emerging Issues of Mountain Communities" },
    { title: "Gender Studies Student Colloquium- LUMS" },
    { title: "Global Digital Humanities Symposium, Michigan State University" },
    { title: "Hisaar FoundationWater Conference" },
    { title: "HU Arzu Anthology- Poem, Karachi Literature Festival" },
    { title: "HU Memorializing the Partition Conference" },
    { title: "HU Partition Conference" },
    { title: "International Biennial Conference of Pakistan Society for Microbiology, Multan" },
    { title: "International Conference on Art Science & Technology, UAE" },
    { title: "Karachi Literature Festival" },
    { title: "Memorializing the Partition- Migration of Ismailies to Pakistan" },
    { title: "Microsoft Imagine Cup, Partition Game" },
    { title: "National Youth Poetry Slam- India" },
    { title: "Pakistan and Peace, Wisconsin , USA" },
    { title: "Project- Bicycle Ride, DIY Nano Festival" },
    { title: "Project Bostaan, DIY City Nano Festival" },
    { title: "Quantum Information Processing," },
    { title: "Saida Waheed Gender Initiative-Project Dareecha" },
    { title: "SHE LOVES TECH, Global Pitch Competition China" },
    { title: "Social Development in Asia, Conference" },
    { title: "SWGI Gender Studies Student Colloquim at LUMS" },
    { title: "The Untold Stories of Parititon 1947" },
    { title: "Undergraduate Network for Research in the Humanities" },
    { title: "Women Empowerment Conference" }
  ];

  positionList: Position[] = [
    { position: "Moderator" },
    { position: "Organizer" },
    { position: "Panelist" },
    { position: "Presenter" }
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

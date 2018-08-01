import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title, Kind } from '../../../interfaces/formFields';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'hut-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.scss']
})
export class AwardComponent implements OnInit {
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

  get awardCategory(): FormArray {
    return this.group.get('awardCategory') as FormArray;
  };

  onTitleChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['title'].setValue(text);
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
    { title: "Dean's List-University of North California, Washington" },
    { title: "Erasmus Mundus Scholarship" },
    { title: "High Academic Achievement Scholarship" }, 
    { title: "HU Dean's Honors List" },
    { title: "HU Merit Scholarship" },
    { title: "Leap Scholarship Award" },
    { title: "President's Honors List" },
    { title: "Rhodes Scholarship Finalist" },
    { title: "Yohsin Scholarship" }
  ];

  kindList: Kind[] = [
    { kind: "Internal" },
    { kind: "External" }
  ];

  titleControl = new FormControl();
  titleFilteredOptions: Observable<Title[]>;

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

  private _filterKind(category: string): Kind[] {
    const filterValue = category.toLowerCase();
    return this.kindList.filter(option => option.kind.toLowerCase().indexOf(filterValue) === 0);
  }
}

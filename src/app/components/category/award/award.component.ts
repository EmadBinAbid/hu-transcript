import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title, Type } from '../../../interfaces/formFields';
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

  get awardCategory(): FormArray {
    return this.group.get('awardCategory') as FormArray;
  };

  onTitleChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['title'].setValue(text);
    }
  }

  onTypeChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['type'].setValue(text);
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

  typeList: Type[] = [
    { type: "Internal" },
    { type: "External" }
  ];

  titleControl = new FormControl();
  titleFilteredOptions: Observable<Title[]>;

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

  private _filterType(category: string): Type[] {
    const filterValue = category.toLowerCase();
    return this.typeList.filter(option => option.type.toLowerCase().indexOf(filterValue) === 0);
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title } from '../../../interfaces/formFields';
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

  titleList: Title[] = [
    { title: "ASPiRE (Association of Scientific Progress in Research and Engineering)" },
    { title:"Enigma, IBA" },
    { title:"Habib Adventure Society" }, 
    { title:"Habib Anime Club" },
    { title:"Habib Arts Society" }
  ];

  titleControl = new FormControl();
  titleFilteredOptions: Observable<Title[]>;

  ngOnInit() 
  {
    this.titleFilteredOptions = this.titleControl.valueChanges
      .pipe(
        startWith<string | Title>(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this._filterTitle(title) : this.titleList.slice())
      );
  }

  private _filterTitle(category: string): Title[] {
    const filterValue = category.toLowerCase();
    return this.titleList.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }
}

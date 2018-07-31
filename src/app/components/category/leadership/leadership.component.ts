import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title, Position } from '../../../interfaces/formFields';
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

  titleList: Title[] = [
    { title: "ASPiRE (Association of Scientific Progress in Research and Engineering)" },
    { title:"Enigma, IBA" },
    { title:"Habib Adventure Society" }, 
    { title:"Habib Anime Club" },
    { title:"Habib Arts Society" }
  ];

  positionList: Position[] = [
    { position: "Activist" },
    { position: "Advisor" },
    { position: "Chair" },
    { position: "Chief Executive Officer" },
    { position: "Chief Financial Officer & Sponsorship Advisor" }
  ];

  titleControl = new FormControl();
  titleFilteredOptions: Observable<Title[]>;

  positionControl = new FormControl();
  positionFilteredOptions: Observable<Position[]>;

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
  }

  private _filterTitle(category: string): Title[] {
    const filterValue = category.toLowerCase();
    return this.titleList.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterPosition(category: string): Position[] {
    const filterValue = category.toLowerCase();
    return this.positionList.filter(option => option.position.toLowerCase().indexOf(filterValue) === 0);
  }
}

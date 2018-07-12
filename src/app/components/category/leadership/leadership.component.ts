import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Title {
  title: string;
}

export interface Position {
  position: string;
}

@Component({
  selector: 'hut-leadership',
  templateUrl: './leadership.component.html',
  styleUrls: ['./leadership.component.scss'],
})
export class LeadershipComponent implements OnInit {
  @Input() group: FormGroup;
  @Output() eventRemoved = new EventEmitter<any>();

  titleList: Title[] = [
    { title: 'HUPSC' },
    { title: 'Serve' },
    { title: 'Some other' }
  ];

  positionList: Position[] = [
    { position: 'President' },
    { position: 'Director' },
    { position: 'Deputy Director' }
  ];

  constructor() {
  }

  removeEvent(index) {
    this.eventRemoved.emit(index);
  }

  get leadershipCategory(): FormArray {
    return this.group.get('leadershipCategory') as FormArray;
  };

  filterControl1 = new FormControl();
  filterControl2 = new FormControl();

  filteredOptions1: Observable<Title[]>;
  filteredOptions2: Observable<Position[]>;

  resetFilter() {
    // this.filteredOptions1 = this.filterControl1.valueChanges
    //   .pipe(
    //     startWith<string | Title>(''),
    //     map(value => typeof value === 'string' ? value : value.title),
    //     map(title => title ? this._filter1(title) : this.titleList)
    //   );

    //   this.filteredOptions2 = this.filterControl2.valueChanges
    //   .pipe(
    //     startWith<string | Position>(''),
    //     map(value => typeof value === 'string' ? value : value.position),
    //     map(position => position ? this._filter2(position) : this.positionList)
    //   );
  }

  ngOnInit() {
    this.filteredOptions1 = this.filterControl1.valueChanges
      .pipe(
        startWith<string | Title>(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this._filter1(title) : this.titleList.slice())
      );

    this.filteredOptions2 = this.filterControl2.valueChanges
      .pipe(
        startWith<string | Position>(''),
        map(value => typeof value === 'string' ? value : value.position),
        map(position => position ? this._filter2(position) : this.positionList.slice())
      );
  }

  private _filter1(title: string): Title[] {
    const filterValue = title.toLowerCase();
    return this.titleList.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filter2(position: string): Position[] {
    const filterValue = position.toLowerCase();
    return this.positionList.filter(option => option.position.toLowerCase().indexOf(filterValue) === 0);
  }

}

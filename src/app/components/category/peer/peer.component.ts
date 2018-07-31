import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title } from '../../../interfaces/formFields';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'hut-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.scss']
})
export class PeerComponent implements OnInit {
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

  get peerCategory(): FormArray {
    return this.group.get('peerCategory') as FormArray;
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

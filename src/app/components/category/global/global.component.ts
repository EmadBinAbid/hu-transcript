import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title, Position, Kind } from '../../../interfaces/formFields';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'hut-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {
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

  get globalCategory(): FormArray {
    return this.group.get('globalCategory') as FormArray;
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
    }
  }

  titleList: Title[] = [
    { title: "Global Undergraduate Exchange Program-Troy University, Alabama, USA" },
    { title: "Anti-Human Advocacy Leadership Program, USA" },
    { title: "Asia Women University, Bangladesh" },
    { title: "Bursa Chamber of Commerce BTSO, Turkey" },
    { title: "Cultural Ambassador of Pakistan-U.s. Department of State" },
    { title: "Entepreneurship Challenge, National University of Singapore" },
    { title: "Enterprise Program" },
    { title: "Global Undergraduate Exchange Program, USA" },
    { title: "Global Youth Forum, UAE" },
    { title: "Gulfood Exhibition, Dubai" },
    { title: "IKU Leuven University, Belgium" },
    { title: "International Business Forum, Turkey" },
    { title: "Mount Mercy Activities Programming Board lowa, USA" },
    { title: "National University of Singapore, Summer School" },
    { title: "Stanford Summer Honors Program, USA" },
    { title: "THAIFEX Food Exhibition, Thailand" },
    { title: "University of California, Berkeley, Summer School" },
    { title: "University of Geneva, Switzerland, Research Visit" },
    { title: "University of Latvia, Research Visit" },
    { title: "University of Michigan, USA, Summer School " },
    { title: "Lufthansa City Centre Workshop, Germany" }
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

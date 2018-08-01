import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title, Type } from '../../../interfaces/formFields';
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

  onTypeChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['type'].setValue(text);
    }
  }

  titleList: Title[] = [
    { title: "Discrete Maths" },
    { title: "Hikma-I" },
    { title: "Jehan-e-Urdu" }, 
    { title: "Micro Controllers & Interfacing" },
    { title: "Nature of Computation" },
    { title: "Data Structures & Algorithms" },
    { title: "Programming Fundamentals" },
    { title: "Quantitative Research Methods" }, 
    { title: "Physics-I: Mechanics" },
    { title: "Calculus-I" },
    { title: "Calculus-II" },
    { title: "Electric Circuit Analysis" },
    { title: "Logical Problem Solving" }, 
    { title: "Mathematics for Social Sciences" },
    { title: "What is Modernity" },
    { title: "Scientific Methods" },
    { title: "Punjabi Rachna" },
    { title: "Sindhi Sikhya" }, 
    { title: "Farsi" },
    { title: "Probability & Statistics" },
    { title: "Pukhto Pohana II" },
    { title: "Linear Algebra" },
    { title: "Development & Social Change" }, 
    { title: "Rhetoric & Communication" },
    { title: "Electriicity & Magnetism" },
    { title: "Engineering Mathematics" },
    { title: "Social Theory" },
    { title: "Digital Logic & Design" }, 
    { title: "Micro & Macro Economics" },
    { title: "Pakistan & Modern South Asia" },
    { title: "OOP & Design Methodologies" },
    { title: "Elements of Computing Systems" },
    { title: "Computational Thinking-I" }, 
    { title: "Computational Thinking-II" }
  ];

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

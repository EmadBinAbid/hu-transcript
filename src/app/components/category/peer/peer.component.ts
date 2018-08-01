import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Title, Kind } from '../../../interfaces/formFields';
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

  onKindChange(event, entryIndex, category) {
    if(event.target.value && event.target.value.length) {
      const text = event.target.value;
      category.controls[entryIndex].controls['kind'].setValue(text);
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

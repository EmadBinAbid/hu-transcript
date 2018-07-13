import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'hut-athletics',
  templateUrl: './athletics.component.html',
  styleUrls: ['./athletics.component.scss']
})
export class AthleticsComponent implements OnInit {
  @Input() group: FormGroup;
  @Output() eventRemoved = new EventEmitter<any>();

  constructor() {
  }

  removeEvent(index, category) {
    const currentEntry = {
      index,
      category
    }
    this.eventRemoved.emit(currentEntry);
  }

  get athleticsCategory(): FormArray {
    return this.group.get('athleticsCategory') as FormArray;
  };

  ngOnInit() {
  }

}

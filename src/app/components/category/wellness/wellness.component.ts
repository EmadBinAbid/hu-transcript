import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'hut-wellness',
  templateUrl: './wellness.component.html',
  styleUrls: ['./wellness.component.scss']
})
export class WellnessComponent implements OnInit {
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

  get wellnessCategory(): FormArray {
    return this.group.get('wellnessCategory') as FormArray;
  };

  ngOnInit() {
  }

}

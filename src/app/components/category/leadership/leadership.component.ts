import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserCategories, LeadershipEntry } from '../../../models/user-data';

@Component({
  selector: 'hut-leadership',
  templateUrl: './leadership.component.html',
  styleUrls: ['./leadership.component.scss'],
})
export class LeadershipComponent implements OnInit {
  private userForm: FormGroup;
  @Input() group: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    // this.userForm = this.createFormGroup(formBuilder);
  }

  createFormGroup(formBuilder: FormBuilder) {
    return new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      studentID: new FormControl(),
      major: new FormControl(),
      userCategories: formBuilder.group(new UserCategories),
      leadershipCategory: this.userForm.get('leadershipCategory') as FormArray
      // leadershipCategory: formBuilder.group(new LeadershipEntry())
    });
  }

  get leadershipCategory(): FormArray {
    return this.group.get('leadershipCategory') as FormArray;
  };

  ngOnInit() {
    console.log(this.leadershipCategory.controls)
  }

}

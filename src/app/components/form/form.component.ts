import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LeadershipEntry, UserDetails, UserCategories } from '../../models/user-data';

export interface User {
  studentID: string;
}

@Component({
  selector: 'hut-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  userForm: FormGroup;

  userList: User[] = [
    { studentID: 'am02266' },
    { studentID: 'am02277' },
    { studentID: 'sh21741' }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.createFormGroup(formBuilder);
  }

  createFormGroup(formBuilder: FormBuilder) {
    return new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      studentID: new FormControl(),
      major: new FormControl(),
      userCategories: formBuilder.group(new UserCategories),
      leadershipCategory: this.formBuilder.array([])
    });
  }

  get leadershipCategory(): FormArray {
    return this.userForm.get('leadershipCategory') as FormArray;
  };

  addEntry(category) {
    switch (category) {
      case 'leadership':
        this.leadershipCategory.push(this.formBuilder.group(new LeadershipEntry()));
        break;
      case n:
        console.log('bubble');
        break;
      default:
        return;
    }
  }

  removeCurrentEvent(index) {
    this.leadershipCategory.removeAt(index);
  }

  userControl = new FormControl();

  filteredUsers: Observable<User[]>;

  ngOnInit() {
    this.leadershipCategory.push(this.formBuilder.group(new LeadershipEntry()));
    this.filteredUsers = this.userControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.studentID),
        map(studentID => studentID ? this._filter(studentID) : this.userList.slice())
      );
  }

  displayFn(user?: User): string | undefined {
    return user ? user.studentID : undefined;
  }

  private _filter(studentID: string): User[] {
    const filterValue = studentID.toLowerCase();

    return this.userList.filter(option => option.studentID.toLowerCase().indexOf(filterValue) === 0);
  }

  submitForm(form) {
    // Make sure to create a deep copy of the form-model
    const result: UserDetails = Object.assign({}, this.userForm.value);
    result.leadershipCategory = Object.assign({}, result.leadershipCategory);

    // Do useful stuff with the gathered data
    console.log(result);
  }
}

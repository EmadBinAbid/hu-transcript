import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LeadershipCategory, UserDetails } from '../../models/user-data';

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
    this.userForm = this.createFormGroup();
  }

  countries = ['USA', 'Germany', 'Italy', 'France'];

  requestTypes = ['Claim', 'Feedback', 'Help Request'];


  createFormGroup() {
    return new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      studentID: new FormControl(),
      major: new FormControl(),
      leadershipCategory: new FormGroup({
        selected: new FormControl(),
        club: new FormControl(),
        position: new FormControl(),
        from: new FormControl(),
        to: new FormControl(),
        image: new FormControl()
      })
    });
  }

  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
    return formBuilder.group({
      firstName: '',
      lastName: '',
      studentID: '',
      major: '',
      leadershipCategory: formBuilder.group(new LeadershipCategory())
    });
  }

  userControl = new FormControl();

  filteredUsers: Observable<User[]>;

  ngOnInit() {
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

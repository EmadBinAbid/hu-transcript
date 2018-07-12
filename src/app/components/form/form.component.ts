import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EventEntry, UserDetails, UserCategories } from '../../models/user-data';

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
      leadershipCategory: this.formBuilder.array([]),
      clubCategory: this.formBuilder.array([]),
      devCategory: this.formBuilder.array([]),
      wellnessCategory: this.formBuilder.array([]),
      campusCategory: this.formBuilder.array([]),
      communityCategory: this.formBuilder.array([]),
      globalCategory: this.formBuilder.array([]),
      academicCategory: this.formBuilder.array([]),
      officialCategory: this.formBuilder.array([]),
      peerCategory: this.formBuilder.array([]),
      athleticsCategory: this.formBuilder.array([]),
      creativeCategory: this.formBuilder.array([]),
      awardCategory: this.formBuilder.array([]),
      otherCategory: this.formBuilder.array([])
    });
  }

  get leadershipCategory(): FormArray {
    return this.userForm.get('leadershipCategory') as FormArray;
  };

  get clubCategory(): FormArray {
    return this.userForm.get('clubCategory') as FormArray;
  };

  get devCategory(): FormArray {
    return this.userForm.get('devCategory') as FormArray;
  };

  get wellnessCategory(): FormArray {
    return this.userForm.get('wellnessCategory') as FormArray;
  };

  get campusCategory(): FormArray {
    return this.userForm.get('campusCategory') as FormArray;
  };

  get communityCategory(): FormArray {
    return this.userForm.get('communityCategory') as FormArray;
  };

  get globalCategory(): FormArray {
    return this.userForm.get('globalCategory') as FormArray;
  };

  get academicCategory(): FormArray {
    return this.userForm.get('academicCategory') as FormArray;
  };

  get officialCategory(): FormArray {
    return this.userForm.get('officialCategory') as FormArray;
  };

  get peerCategory(): FormArray {
    return this.userForm.get('peerCategory') as FormArray;
  };

  get athleticsCategory(): FormArray {
    return this.userForm.get('athleticsCategory') as FormArray;
  };

  get creativeCategory(): FormArray {
    return this.userForm.get('creativeCategory') as FormArray;
  };

  get awardCategory(): FormArray {
    return this.userForm.get('awardCategory') as FormArray;
  };

  get otherCategory(): FormArray {
    return this.userForm.get('otherCategory') as FormArray;
  };

  addEntry(category) {
    category.push(this.formBuilder.group(new EventEntry()));
  }

  addSingleEntry(category) {
    if (!category.length) {
      this.addEntry(category);
    } else {
      category.controls.splice(0);
    }
  }

  removeCurrentEvent(index) {
    this.leadershipCategory.removeAt(index);
  }

  userControl = new FormControl();

  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.userControl.valueChanges
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

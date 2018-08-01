import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormResult } from '../../interfaces/formResult';
import * as FormField from '../../interfaces/formFields';
import { map, startWith } from 'rxjs/operators';
import { EventEntry, UserDetails, UserCategories } from '../../models/user-data';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'hut-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  userForm: FormGroup;
  formResultsLocal: any;
  formResults: Array<FormResult> = [];
  currentEntry: FormResult;

  schoolList: FormField.School[] = [
    { school: "Dhanani's School of Science & Engineering (DSSE)" },
    { school: "School of Arts, Humanities & Social Sciences (AHSS)" }
  ];

  majorList: FormField.Major[] = [
    { major: "Computer Science" },
    { major: "Electrical Engineering" },
    { major: "Social Development & Policy" },
    { major: "Communication & Design" }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {
    this.userForm = this.createFormGroup(formBuilder);
    this.formResultsLocal = (localStorage.getItem('formSubmissionList') !== null) ? JSON.parse(localStorage.getItem('formSubmissionList')) : [];

    if (!this.formResultsLocal || this.formResultsLocal.length === 0) {
      this.formResults;
    } else {
      this.formResults = this.formResultsLocal;
    }
  }

  createFormGroup(formBuilder: FormBuilder) {
    return new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      studentID: new FormControl(),
      school: new FormControl(),
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

  removeCurrentEvent(event) {
    event.category.removeAt(event.index);
  }

  schoolControl = new FormControl();
  majorControl = new FormControl();

  schoolFilteredOptions: Observable<FormField.School[]>;
  majorFilteredOptions: Observable<FormField.Major[]>;

  ngOnInit() {
    this.schoolFilteredOptions = this.schoolControl.valueChanges
      .pipe(
        startWith<string | FormField.School>(''),
        map(value => typeof value === 'string' ? value : value.school),
        map(school => school ? this._filterSchool(school) : this.schoolList.slice())
      );

    this.majorFilteredOptions = this.majorControl.valueChanges
      .pipe(
        startWith<string | FormField.Major>(''),
        map(value => typeof value === 'string' ? value : value.major),
        map(major => major ? this._filterMajor(major) : this.majorList.slice())
      );
  }

  private _filterSchool(school: string): FormField.School[] {
    const filterValue = school.toLowerCase();

    return this.schoolList.filter(option => option.school.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterMajor(major: string): FormField.Major[] {
    const filterValue = major.toLowerCase();

    return this.majorList.filter(option => option.major.toLowerCase().indexOf(filterValue) === 0);
  }

  submitForm() {
    this.userForm.controls["school"].setValue(this.schoolControl.value);
    this.userForm.controls["major"].setValue(this.majorControl.value);
    
    console.log(this.userForm.status);
    console.log(this.userForm.value);
    console.log(this.userForm.valid);

    if (this.userForm.valid) {
      // Make sure to create a deep copy of the form-model
      const result: UserDetails = Object.assign({}, this.userForm.value);
      result.leadershipCategory = Object.assign({}, result.leadershipCategory);

      // Do useful stuff with the gathered data
      this.currentEntry = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        studentID: this.userForm.value.studentID,
        school: this.userForm.value.school,
        major: this.userForm.value.major,
        categories: this.userForm.value.categories,
        leadershipCategory: this.userForm.value.leadershipCategory,
        clubCategory: this.userForm.value.clubCategory,
        devCategory: this.userForm.value.devCategory,
        wellnessCategory: this.userForm.value.wellnessCategory,
        campusCategory: this.userForm.value.campusCategory,
        communityCategory: this.userForm.value.communityCategory,
        globalCategory: this.userForm.value.globalCategory,
        academicCategory: this.userForm.value.academicCategory,
        officialCategory: this.userForm.value.officialCategory,
        peerCategory: this.userForm.value.peerCategory,
        athleticsCategory: this.userForm.value.athleticsCategory,
        creativeCategory: this.userForm.value.creativeCategory,
        awardCategory: this.userForm.value.awardCategory,
        otherCategory: this.userForm.value.otherCategory,
        date: Date()
      }

      this.formService.addForm(this.currentEntry)
      .subscribe( (result) => {
        alert("Your form has been submitted successfully.");
        this.userForm.reset();
      },
      (err) => {
        if(err.statusText === "Unauthorized")
          alert("The form with given StudentID is already submitted.");
        if(err.statusText === "Bad Request")
          alert("Error Code: 400 -> Bad Request");
      });
    }
    else
      alert("Please fill in the required fields.");
  }
}

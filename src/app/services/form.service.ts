import { Injectable } from '@angular/core';
import { FormResult } from '../interfaces/formResult';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private http: HttpClient
  ) { }

  addForm(currentEntry: FormResult)
  {
    console.log(currentEntry);
    // this.http.post('http://localhost:3000/form', current)
  }
}

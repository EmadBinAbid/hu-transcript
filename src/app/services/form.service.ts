import { Injectable } from '@angular/core';
import { FormResult } from '../interfaces/formResult';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private http: HttpClient
  ) { }

  addForm(currentEntry: FormResult)
  {
    const requestObject = new FormData();
    
    Object.keys(currentEntry).forEach(function(key)
    {
      if(!key.toLowerCase().includes("category"))
        requestObject.append(key.toString(), currentEntry[key]);
      else
      {
        for(var i=0; i<currentEntry[key].length; i++)
        {
          requestObject.append(key + '['+ i + '][title]', currentEntry[key][i]["title"]);
          requestObject.append(key + '['+ i + '][position]', currentEntry[key][i]["position"]);
          requestObject.append(key + '['+ i + '][from]', currentEntry[key][i]["from"]);
          requestObject.append(key + '['+ i + '][to]', currentEntry[key][i]["to"]);
          requestObject.append('upload', currentEntry[key][i]["image"]);
        }
      }
    });
    this.http.post('http://localhost:3000/form', requestObject)
    .subscribe( (result) => {} );
  }

  getAllForms()
  {
    var headers = new HttpHeaders(
      {'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('mct-app_token')}`
      }
    );

    return this.http.get('http://localhost:3000/form/all-forms', { headers })
    .pipe(
      tap( (response) => {
        //Do something
        
      })
    );
  }

  getFormCategoriesBySupervisorId()
  {
    var headers = new HttpHeaders(
      {'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('mct-app_token')}`
      }
    );

    return this.http.get('http://localhost:3000/form/categories', { headers })
    .pipe(
      tap( (response) => {
        //Do something
        
      })
    );
  }

  /*viewUploadByStudentId(studentID: String, filename: String)
  {
    var headers = new HttpHeaders(
      {'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('mct-app_token')}`
      }
    );

    console.log(studentID + '--' + filename);
    return this.http.get(`http://localhost:3000/form/upload/download?studentID=${studentID}&filename=${filename}`, { headers })
    .pipe(
      tap( (response) => {
        console.log(response);
        
      })
    );
  }*/

  
}

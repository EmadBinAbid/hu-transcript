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
}

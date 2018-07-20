import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;

  constructor(
    private http: HttpClient
  ) 
  {
    this.token = localStorage.getItem('mct-app_token');
  }

  login(credentials)
  {
    var headers = new HttpHeaders(
      { 'Content-Type': 'application/json' }
    );

    return this.http.post('http://localhost:3000/login', { user: credentials }, { headers })
    .pipe( 
      tap( (response) => {
        localStorage.setItem('mct-app_token', response["token"]);
      })
     );
  }
}

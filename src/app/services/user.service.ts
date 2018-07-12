import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  $userListStateSubject: BehaviorSubject<string> = new BehaviorSubject('public');
  $userListState: Observable<string>;

  constructor() {
    this.$userListState = this.$userListStateSubject.asObservable();
  }
}


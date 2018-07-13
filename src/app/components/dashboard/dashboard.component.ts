import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'hut-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  submissionList: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'studentID', 'major', 'actions'];
  dataSource: any;

  constructor(
    public router: Router
  ) {
    this.submissionList = (localStorage.getItem('formSubmissionList') !== null) ? JSON.parse(localStorage.getItem('formSubmissionList')) : [];
    this.dataSource = this.submissionList;
  }

  storeItem(currentItem) {
    localStorage.setItem('currentFormItem', JSON.stringify(currentItem));
    this.router.navigate(['/details']);
  }

  ngOnInit() {
  }

}

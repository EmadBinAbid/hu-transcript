import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hut-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {

  submissionList: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'studentID', 'major', 'actions'];
  dataSource: any;

  constructor(
    public router: Router
  ) 
  {
    this.submissionList = (localStorage.getItem('formSubmissionList') !== null) ? JSON.parse(localStorage.getItem('formSubmissionList')) : [];
    this.dataSource = this.submissionList;
  }

  ngOnInit() {
  }

  storeItem(currentItem)
  {
    localStorage.setItem('currentFormItem', JSON.stringify(currentItem));
    this.router.navigate(['/details']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../../services/form.service';

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
    public router: Router,
    private formService: FormService
  ) {
    this.formService.getAllForms()
    .subscribe((result) => {
      this.dataSource = result["form"];  
    });
  }

  ngOnInit() {
  }

  viewDetails(currentItem) {
    localStorage.setItem('administrator_currentFormItem', JSON.stringify(currentItem));
    this.router.navigate(['/adminDetails']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../../services/form.service';

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
    public router: Router,
    private formService: FormService
  ) 
  {
    this.formService.getAllForms()
    .subscribe( (result) => {
      this.dataSource = result["form"];
    } );
  }

  ngOnInit() {
  }

  storeItem(currentItem)
  {
    localStorage.setItem('currentFormItem', JSON.stringify(currentItem));
    this.router.navigate(['/details']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'hut-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdminDetailsComponent implements OnInit {

  currentFormItem: Object;

  constructor(
    private formService: FormService
  ) 
  {
    this.currentFormItem = (localStorage.getItem('administrator_currentFormItem') !== null) ? JSON.parse(localStorage.getItem('administrator_currentFormItem')) : [];
  }

  ngOnInit() {
  }

  viewAttachment(category, index)
  {
    window.location.href = 
    `http://localhost:3000/form/upload/download?studentID=${this.currentFormItem['studentID']}&filename=${this.currentFormItem['studentID']}_${category}_${index}`;
  }
}

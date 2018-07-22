import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'hut-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  currentFormItem: Object;

  constructor(
    private formService: FormService
  ) 
  {
    this.currentFormItem = (localStorage.getItem('supervisor_currentFormItem') !== null) ? JSON.parse(localStorage.getItem('supervisor_currentFormItem')) : [];
  }

  ngOnInit() {
  }

  viewAttachment(category, index)
  {
    window.location.href = 
    `http://localhost:3000/form/upload/download?studentID=${this.currentFormItem['studentID']}&filename=${this.currentFormItem['studentID']}_${category}_${index}`;
  }
}

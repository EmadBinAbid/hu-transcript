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
    window.open(`http://localhost:3000/form/upload/download?studentID=${this.currentFormItem['studentID']}&filename=${this.currentFormItem['studentID']}_${category}_${index}`, 
    '_blank');
  }

  changeApprovedStatus(isApproved: Boolean, categoryName: String, index)
  {
    console.log(JSON.parse(localStorage.getItem('supervisor_currentFormItem')));

    var category = this.currentFormItem[`${categoryName}`]; 
    category = category[index];
    const currentId = category['_id']
    
    const requestBody = {
      studentID: this.currentFormItem['studentID'],
      categoryName: categoryName,
      _id: currentId,
      isApproved: isApproved
    };

    //console.log(requestBody);

    //Subscribe to api
    this.formService.changeApprovedStatus(isApproved, requestBody)
    .subscribe( (result) => {
      console.log(result);
    });
  }
}

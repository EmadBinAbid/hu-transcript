import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hut-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  currentFormItem: Object;

  constructor() {
    this.currentFormItem = (localStorage.getItem('currentFormItem') !== null) ? JSON.parse(localStorage.getItem('currentFormItem')) : [];
  }

  ngOnInit() {
  }

}

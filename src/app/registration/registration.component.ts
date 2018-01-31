import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  grid = [
      {cols: 1},
      {cols: 1, rows: 1, color: 'lightblue'}
  ];
  constructor() { }

  ngOnInit() {
  }
}

import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  projectName = 'GALACTIKA';
  routes = [
    {'name': 'Home', 'link': '.'},
    {'name': 'Login', 'link': '.'},
    {'name': 'Sign Up', 'link': 'registration'}
  ];
}


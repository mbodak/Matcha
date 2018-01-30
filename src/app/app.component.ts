import { Component } from '@angular/core';

// import { ParallaxNetworkComponent } from './parallax-network/parallax-network.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routes = [
    {'name': 'Home', 'link': '.'},
    {'name': 'Login', 'link': '.'},
    {'name': 'Sign Up', 'link': 'registration'}
  ];
}


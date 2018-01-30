import { Component, OnInit } from '@angular/core';

import { Network } from './Network';



@Component({
  selector: 'app-parallax-network',
  templateUrl: './parallax-network.component.html',
  styleUrls: ['./parallax-network.component.css']
})






export class ParallaxNetworkComponent implements OnInit {
  div: HTMLElement;
  constructor(div: HTMLElement) {
    this.div = div;
  }

  ngOnInit() {
    const options = {
      particleColor: '#AAA',
      interactive: true,
      speed: 'fast',
      density: 10000
    };
    const network = new Network(this.div, options);
  }

}

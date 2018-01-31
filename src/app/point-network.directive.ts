import { Directive, ElementRef, OnInit } from '@angular/core';

import { Network } from './Network';

@Directive({
  selector: '[appPointNetwork]'
})
export class PointNetworkDirective implements OnInit {
    private elRef: ElementRef;
    constructor(el: ElementRef) {
        this.elRef = el;
    }
    ngOnInit() {
        const options = {
            particleColor: '#dfcecb',
            // particleColor: '#7175b6',
            interactive: false,
            speed: 'slow',
            density: 4000
        };
        const network = new Network( this.elRef.nativeElement, options);
    }
}

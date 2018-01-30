import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxNetworkComponent } from './parallax-network.component';

describe('ParallaxNetworkComponent', () => {
  let component: ParallaxNetworkComponent;
  let fixture: ComponentFixture<ParallaxNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

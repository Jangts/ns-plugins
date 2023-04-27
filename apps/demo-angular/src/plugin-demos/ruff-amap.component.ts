import { Component, NgZone } from '@angular/core';
import { DemoSharedRuffAmap } from '@demo/shared';
import {} from '@nativescript/ruff-amap';

@Component({
  selector: 'demo-ruff-amap',
  templateUrl: 'ruff-amap.component.html',
})
export class RuffAmapComponent {
  demoShared: DemoSharedRuffAmap;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedRuffAmap();
  }
}

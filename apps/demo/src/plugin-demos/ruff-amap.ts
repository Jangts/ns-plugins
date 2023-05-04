/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Observable, EventData, Page } from '@nativescript/core';
// import { DemoSharedRuffAmap } from '@demo/shared';
// import { RuffAmap } from '@nativescript/ruff-amap';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends Observable {
  onMapReady() {
    console.log('mapReady');
  }
}

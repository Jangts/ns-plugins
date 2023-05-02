import { Observable, EventData, Page } from '@nativescript/core';
// import { DemoSharedRuffAmap } from '@demo/shared';
import { RuffAmap } from '@nativescript/ruff-amap';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new RuffAmap();
}

export class DemoModel extends RuffAmap {}

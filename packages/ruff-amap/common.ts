/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentView, Property } from '@nativescript/core';

abstract class RuffAmapViewCommonBase extends ContentView {}

// export const mapReadyProperty = new Property<RuffAmapViewCommonBase, string>({ name: 'mapReady' });
// mapReadyProperty.register(RuffAmapViewCommonBase);

export const mapApiKeyProperty = new Property<RuffAmapViewCommonBase, string>({ name: 'mapApiKey' });
mapApiKeyProperty.register(RuffAmapViewCommonBase);

export const mapWidthProperty = new Property<RuffAmapViewCommonBase, number>({
  name: 'mapWidth',
  defaultValue: 200,
  // valueConverter: numberConverter,
});
mapWidthProperty.register(RuffAmapViewCommonBase);

export abstract class RuffAmapViewBase extends RuffAmapViewCommonBase {
  public static mapReadyEvent = 'mapReady';

  protected config: any = {};

  [mapApiKeyProperty.setNative](value: string) {
    this.config.mapApiKey = value;
  }

  [mapWidthProperty.setNative](value: number) {
    this.config.mapWidth = +value;
  }
}

export class RuffAmapCommon extends RuffAmapViewCommonBase {
  testIt() {
    console.log('Hello, world!');
  }
}

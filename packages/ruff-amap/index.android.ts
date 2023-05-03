/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Color, ContentView } from '@nativescript/core';
import { RuffAmapCommon } from './common';

export class RuffAmapView extends ContentView {
  public nativeView: android.widget.FrameLayout;

  constructor() {
    super();
  }
  // 2. (required) Construct and return any platform native view
  createNativeView() {
    // console.log('createNativeView');
    // return instance of UIView or android.view.View;
    this.nativeView = new android.widget.FrameLayout(this._context);
    this.nativeView.setBackgroundColor(new Color('White').android);
    return this.nativeView;
  }

  // 3. (optional) initialize anything

  // public initNativeView(): void {
  //   console.log('initNativeView');
  //   super.initNativeView();
  //   this.nativeView.owner = this;
  // }

  public onLoaded() {
    super.onLoaded();
    this.initMapView();
  }

  // 4. (optional) cleanup anything
  // disposeNativeView() {}

  initMapView() {
    // @ts-ignore
    com.amap.api.maps.MapsInitializer.updatePrivacyShow(this._context, true, true);
    // @ts-ignore
    com.amap.api.maps.MapsInitializer.updatePrivacyAgree(this._context, true);
    const nativeMapView = new com.amap.api.maps.MapView(this._context);
    // @ts-ignore
    nativeMapView.onCreate(null);
    // nativeMapView.onCreate(new android.os.Bundle());

    // @ts-ignore
    const map = nativeMapView.getMap();

    // @ts-ignore
    console.log('map 1', Object.keys(this._context), this._context.isNativeScriptActivity, nativeMapView.isShown());
    console.log('map 2', this._context._callbacks._rootView, map.addMarker, map);

    this.nativeView.addView(nativeMapView);
  }

  initLabel() {
    const label = new android.widget.TextView(this._context);
    label.setText('Hello, world');
    label.setBackgroundColor(new Color('Blue').android);
    label.setTextColor(new Color('#ffff00').android);
    this.nativeView.addView(label);
  }

  initWebView() {
    const url = 'https://www.baidu.com';
    const webview = new android.webkit.WebView(this._context);
    const settings = webview.getSettings();

    // Needed for the bridge library
    settings.setJavaScriptEnabled(true);
    settings.setAllowFileAccess(true); // Needed for Android 11

    webview.loadUrl(url);
    this.nativeView.addView(webview);
  }
}

export class RuffAmap extends RuffAmapCommon {}

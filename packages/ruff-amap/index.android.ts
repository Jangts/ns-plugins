/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Color, ContentView } from '@nativescript/core';
import { RuffAmapCommon, RuffAmapViewBase } from './common';

export class RuffAmapView extends RuffAmapViewBase {
  public nativeView: android.widget.FrameLayout;
  private nativeMapView: com.amap.api.maps.MapView;
  private nativeMap: com.amap.api.maps.AMap;

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
    console.log('this.config', this.config);

    // @ts-ignore
    com.amap.api.maps.MapsInitializer.updatePrivacyShow(this._context, true, true);
    // @ts-ignore
    com.amap.api.maps.MapsInitializer.updatePrivacyAgree(this._context, true);
    this.initMapView();

    // @ts-ignore
    const map = this.nativeMapView.getMap();
    map.setMapType(com.amap.api.maps.AMap.MAP_TYPE_SATELLITE);

    // @ts-ignore
    // console.log('map', map, map.addMarker, map.addPolyline, this.nativeMapView.setLogoPosition, map.addTileOverlay, map.moveCamera, map.setMapStatusLimits);
    console.log('hasListeners mapReady', this.hasListeners(RuffAmapViewBase.mapReadyEvent));

    this.notify({
      eventName: RuffAmapViewBase.mapReadyEvent,
      object: this,
      map: map,
    });
  }

  // 4. (optional) cleanup anything
  // disposeNativeView() {}

  initMapView() {
    const centerBJPoint = new com.amap.api.maps.model.LatLng(39.904989, 117.405285);
    const mapOptions = new com.amap.api.maps.AMapOptions();
    mapOptions.camera(new com.amap.api.maps.model.CameraPosition(centerBJPoint, 10, 0, 0));
    this.nativeMapView = new com.amap.api.maps.MapView(this._context, mapOptions);

    // @ts-ignore
    this.nativeMapView.onCreate(null);
    // this.nativeMapView.onCreate(new android.os.Bundle());

    this.nativeView.addView(this.nativeMapView);
  }

  // initLabel() {
  //   const label = new android.widget.TextView(this._context);
  //   label.setText('Hello, world');
  //   label.setBackgroundColor(new Color('Blue').android);
  //   label.setTextColor(new Color('#ffff00').android);
  //   this.nativeView.addView(label);
  // }

  // initWebView() {
  //   const url = 'https://www.baidu.com';
  //   const webview = new android.webkit.WebView(this._context);
  //   const settings = webview.getSettings();

  //   // Needed for the bridge library
  //   settings.setJavaScriptEnabled(true);
  //   settings.setAllowFileAccess(true); // Needed for Android 11

  //   webview.loadUrl(url);
  //   this.nativeView.addView(webview);
  // }
}

export class RuffAmap extends RuffAmapCommon {}

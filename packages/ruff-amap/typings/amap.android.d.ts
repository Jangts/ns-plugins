/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace com {
  export namespace tns {
    export class NativeScriptActivity extends android.app.Activity {}
  }
  export namespace amap {
    export namespace api {
      export namespace maps {
        export namespace model {
          export class LatLng {
            constructor(param0: number, param1: number);
          }
          export class CameraPosition {
            constructor(param0: com.amap.api.maps.model.LatLng, param1: number, param2: number, param3: number);
          }
        }

        export class MapView extends globalAndroid.widget.FrameLayout {
          public static class: java.lang.Class<com.amap.api.maps.MapView>;
          public constructor(param0: globalAndroid.content.Context, param1: com.api.maps.AMapOptions);
        }

        export class AMap {
          static MAP_TYPE_SATELLITE: any;
        }

        export class AMapOptions {
          camera: any;
        }
      }
    }
  }
}

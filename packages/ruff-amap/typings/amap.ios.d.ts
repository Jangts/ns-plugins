type MAMapDelegate = NSObjectProtocol;

interface MAMap extends NSObject {
  delegate: MAMapDelegate;
  initWithWebView: (webView: UIWebView) => MAMap;
}

interface ViewControllerDelegate extends NSObjectProtocol {
  viewController(itemClassName: string, title: string): boolean;
  viewController(itemClassName: string): string;
}

interface ViewController extends UIViewController {
  delegate: ViewControllerDelegate;
}

declare class LocationViewController extends UIViewController {}

declare class MAMapView extends UIView {
  static alloc(): MAMapView;
  delegate: ContentView;
  initWithFrame(frame: CGRect): this;
}

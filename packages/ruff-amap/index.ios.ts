/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Color, ContentView, Frame } from '@nativescript/core';
import { RuffAmapCommon } from './common';

// @NativeClass()
// class MAMapViewTest extends MAMapView {
//   static new() {
//     return super.new() as MAMapView;
//   }

//   // @ts-ignore
//   updatePrivacyShowPrivacyInfo(showStatus: AMapPrivacyShowStatus, containStatus: AMapPrivacyInfoStatus) {
//     // @ts-ignore
//     super.updatePrivacyShowPrivacyInfo(showStatus, containStatus);
//   }

//   // @ts-ignore
//   updatePrivacyAgree(agreeSStatus: AMapPrivacyAgreeStatus) {
//     // @ts-ignore
//     super.updatePrivacyAgree(agreeSStatus);
//   }
// }

export class RuffAmapView extends ContentView {
  private nativeMapView: MAMapView;

  constructor() {
    super();
    NSUserDefaults.standardUserDefaults.setBoolForKey(true, 'agreeStatus');
    NSUserDefaults.standardUserDefaults.synchronize();

    // @ts-ignore
    AMapServices.sharedServices().enableHTTPS = true;

    // @ts-ignore
    AMapServices.sharedServices().apiKey = '690198b0b544d276bc49d2c5ef8d3f3f';

    // @ts-ignore
    // console.log(AMapServices.sharedServices().apiKey, Object.keys(MAMapView), MAMapView.test, MAMapView.updatePrivacyAgree);
    try {
      // @ts-ignore
      MAMapView.updatePrivacyAgree(AMapPrivacyAgreeStatus.DidAgree);
      // @ts-ignore
      MAMapView.updatePrivacyShowPrivacyInfo(AMapPrivacyShowStatus.DidShow, AMapPrivacyInfoStatus.DidContain);
    } catch (error) {
      console.log('error', error);
    }
  }

  public initNativeView(): void {
    super.initNativeView();
    this.nativeView.owner = this;
  }

  public onLoaded() {
    super.onLoaded();
    this.initMapView();
  }

  public createNativeView(): UIView {
    // console.log('createNativeView');
    const nativeView = super.createNativeView() as UIView;
    return nativeView;
  }

  initMapView() {
    // console.log('bounds:', nativeView.bounds);
    // const configuration = WKWebViewConfiguration.new();
    // configuration.dataDetectorTypes = WKDataDetectorTypes.All;
    // configuration.preferences.setValueForKey(true, 'allowFileAccessFromFileURLs');
    // configuration.setValueForKey(true, 'allowUniversalAccessFromFileURLs');

    // const nsURL = NSURL.URLWithString('http://www.baidu.com');
    // const nsRequestWithUrl = NSURLRequest.requestWithURL(nsURL);
    // const webview = new WKWebView({
    //   frame: nativeView.bounds,
    //   configuration,
    // });

    // // const webview = UIWebView.alloc().initWithFrame(CGRectMake(0, 0, 200, 200));
    // webview.backgroundColor = new Color('Blue').ios;
    // webview.loadRequest(nsRequestWithUrl);

    // const coder = NSCoder.alloc();
    // const label = UILabel.alloc().initWithFrame(nativeView.bounds);
    // label.text = 'Hello, world';
    // label.backgroundColor = new Color('Blue').ios;
    // label.textColor = new Color('#ffff00').ios;
    // console.log('label', label, label.textColor);
    // @ts-ignore
    // QMapServices.sharedServices().setPrivacyAgreement(true);
    // @ts-ignore
    // QMapServices.sharedServices().APIKey = '690198b0b544d276bc49d2c5ef8d3f3f';

    // @ts-ignore
    // console.log(AMapFoundation);

    // NSUserDefaults.standardUserDefaults.setBoolForKey(false, 'agreeStatus');
    // console.log(NSUserDefaults.standardUserDefaults.boolForKey('agreeStatus'));

    // if (!NSUserDefaults.standardUserDefaults.boolForKey('agreeStatus')) {
    //   //添加隐私合规弹窗
    this.addAlertController();
    //   //更新App是否显示隐私弹窗的状态，隐私弹窗是否包含高德SDK隐私协议内容的状态. since 8.1.0
    //   // MAMapView.updatePrivacyShowPrivacyInfo(AMapPrivacyShowStatus.didShow, privacyInfo: AMapPrivacyInfoStatus.didContain)
    // }

    this.nativeMapView = MAMapView.alloc().initWithFrame(CGRectMake(0, 0, this.nativeView.frame.size.width, this.nativeView.frame.size.height));
    this.nativeMapView.delegate = this;
    this.nativeMapView.backgroundColor = new Color('#ffffcc').ios;
    this.nativeView.addSubview(this.nativeMapView);
  }

  public onLayout(left: number, top: number, right: number, bottom: number): void {
    super.onLayout(left, top, right, bottom);
    if (this.nativeMapView) {
      this.nativeMapView.layer.frame = this.ios.layer.bounds;
    }
  }

  addAlertController() {
    const viewController = Frame.topmost().currentPage.ios;

    const paragraphStyle: NSMutableParagraphStyle = NSMutableParagraphStyle.alloc().init();
    paragraphStyle.alignment = NSTextAlignment.Left;
    const dict = NSDictionary.dictionaryWithObjectForKey<string, NSMutableParagraphStyle>(paragraphStyle, NSParagraphStyleAttributeName);
    const message: NSMutableAttributedString = NSMutableAttributedString.alloc().initWithStringAttributes('\n亲，感谢您对XXX一直以来的信任！我们依据最新的监管要求更新了XXX《隐私权政策》，特向您说明如下\n1.为向您提供交易相关基本功能，我们会收集、使用必要的信息；\n2.基于您的明示授权，我们可能会获取您的位置（为您提供附近的商品、店铺及优惠资讯等）等信息，您有权拒绝或取消授权；\n3.我们会采取业界先进的安全措施保护您的信息安全；\n4.未经您同意，我们不会从第三方处获取、共享或向提供您的信息；', dict);
    message.setAttributesRange(NSDictionary.dictionaryWithObjectForKey<string, UIColor>(UIColor.blueColor, NSForegroundColorAttributeName), NSString.stringWithString(message.string).rangeOfString('《隐私权政策》'));

    const alert: UIAlertController = UIAlertController.alertControllerWithTitleMessagePreferredStyle('温馨提示(隐私合规示例)', '', UIAlertControllerStyle.Alert);
    alert.setValueForKey(message, 'attributedMessage');

    const conform: UIAlertAction = UIAlertAction.actionWithTitleStyleHandler('同意', UIAlertActionStyle.Default, () => {
      // @ts-ignore
      NSUserDefaults.standardUserDefaults.setBoolForKey(true, 'agreeStatus');
      // @ts-ignore
      NSUserDefaults.standardUserDefaults.synchronize();
      //更新用户授权高德SDK隐私协议状态. since 8.1.0
      // @ts-ignore
      MAMapView.updatePrivacyAgree(AMapPrivacyAgreeStatus.DidAgree);
    });
    const cancel: UIAlertAction = UIAlertAction.actionWithTitleStyleHandler('不同意', UIAlertActionStyle.Default, () => {
      // @ts-ignore
      NSUserDefaults.standardUserDefaults.setBoolForKey(false, 'agreeStatus');
      // @ts-ignore
      NSUserDefaults.standardUserDefaults.synchronize();
      //更新用户授权高德SDK隐私协议状态. since 8.1.0
      // @ts-ignore
      MAMapView.updatePrivacyAgree(AMapPrivacyAgreeStatus.NotAgree);
    });
    alert.addAction(conform);
    alert.addAction(cancel);

    viewController.presentViewControllerAnimatedCompletion(alert, true, null);
  }
}

export class RuffAmap extends RuffAmapCommon {
  testIt() {
    console.log('Hello, RuffAmap!');
  }
}

// @NativeClass()
// export class WKUIDelegateNotaImpl extends NSObject {

// }

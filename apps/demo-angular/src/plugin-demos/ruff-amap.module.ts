import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { RuffAmapComponent } from './ruff-amap.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: RuffAmapComponent }])],
  declarations: [RuffAmapComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class RuffAmapModule {}

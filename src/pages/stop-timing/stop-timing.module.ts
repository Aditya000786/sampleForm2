import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StopTimingPage } from './stop-timing';

@NgModule({
  declarations: [
    StopTimingPage,
  ],
  imports: [
    IonicPageModule.forChild(StopTimingPage),
  ],
  exports: [
    StopTimingPage
  ]
})
export class StopTimingPageModule {}

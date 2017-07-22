import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeekDetailPage } from './week-detail';

import {HoursMinutesSecondsPipe} from '../../pipes/hours-minutes-seconds/hours-minutes-seconds';

@NgModule({
  declarations: [
    WeekDetailPage,
    HoursMinutesSecondsPipe
  ],
  imports: [
    IonicPageModule.forChild(WeekDetailPage),
  ],
  exports: [
    WeekDetailPage
  ]
})
export class WeekDetailPageModule {}

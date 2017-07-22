import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProjectProvider } from '../providers/project/project';
import { TimerProvider } from '../providers/timer/timer';
import { ConversionProvider } from '../providers/conversion/conversion';
import { AuthProvider } from '../providers/auth/auth';
import { Http,HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // HoursMinutesSecondsPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectProvider,
    TimerProvider,
    ConversionProvider,
    AuthProvider
  ],
  // exports:[
  //   HoursMinutesSecondsPipe
  // ]
})
export class AppModule {}

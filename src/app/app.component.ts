import { Component,NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  rootPage:any;
  zone:NgZone;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    firebase.initializeApp({
    apiKey: "AIzaSyChkX1mts_T3RrNHEp7-Ht0rbd0u8Vl9Lw",
    authDomain: "tiktik-v1.firebaseapp.com",
    databaseURL: "https://tiktik-v1.firebaseio.com",
    projectId: "tiktik-v1",
    storageBucket: "tiktik-v1.appspot.com",
    messagingSenderId: "303459241490"
  });

  //   firebase.auth().onAuthStateChanged((user) => {
  //   if (!user) {
  //     this.rootPage = 'login';
  //   } else { 
  //     this.rootPage = HomePage;
  //   }
  // });
    this.zone=new NgZone({});
    var unsubscribe =firebase.auth().onAuthStateChanged((user) => {
  this.zone.run( () => {
    if (!user) {
      this.rootPage = 'login';
      //unsubscribe();
    } else { 
      this.rootPage = HomePage;
      //unsubscribe();
    }
  });     
});
  
  }
}


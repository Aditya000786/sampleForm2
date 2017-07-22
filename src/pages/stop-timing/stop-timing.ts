 import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';

/**
 * Generated class for the StopTimingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'stop'
})
@Component({
  selector: 'page-stop-timing',
  templateUrl: 'stop-timing.html',
})
export class StopTimingPage {
    
    totalSec:number=0;
    chargedSec:number=0;
    unChargedSec:number=0;
    
    totalTimeHrs:number=0;
    chargedTimeHrs:number=0;
    unChargedTimeHrs:number=0;
    totalTimeMin:number=0;
    chargedTimeMin:number=0;
    unChargedTimeMin:number=0;
    totalTimeSec:number=0;
    chargedTimeSec:number=0;
    unChargedTimeSec:number=0;

    totalTimeRestore:number=0;
    chargedTimeRestore:number;
    unChargedTimeRestore:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
  public alertController:AlertController) {
  }

  public convertToNumber(event):number{
    return +event;
  }
  ionViewDidLoad() {
    
    this.totalSec=parseInt(this.navParams.get('totalTime'));
    let t1=Math.floor(this.totalSec/3600);
    let t=this.totalSec%3600;
    let minutes=Math.floor(t/60);
    let seconds=Math.floor(t%60);

    this.totalTimeMin=minutes;
    this.totalTimeHrs=t1;
    this.totalTimeSec=seconds;

    this.chargedTimeHrs=this.totalTimeHrs;
    this.chargedTimeMin=this.totalTimeMin;
    this.chargedTimeSec=this.totalTimeSec;

    this.totalTimeRestore=this.totalSec;
    this.chargedTimeRestore=this.chargedSec;
    this.unChargedTimeRestore=this.unChargedSec;
  }

  submitTime(){
    this.totalSec=this.totalTimeHrs*60*60+this.totalTimeMin*60+this.totalTimeSec;
    this.chargedSec=this.chargedTimeHrs*60*60+this.chargedTimeMin*60+this.chargedTimeSec;
    this.unChargedSec=this.unChargedTimeHrs*60*60+this.unChargedTimeMin*60+this.unChargedTimeSec;
    
    

    let sum1=this.totalSec;
    let sum2=this.chargedSec+this.unChargedSec;

    if(sum1!=sum2){
        let alert=this.alertController.create({
        title:'Oops',
        subTitle:'You have messed up with calculation',
        buttons:['Ok']
      });
      alert.present();       
      this.totalSec=this.totalTimeRestore;
      this.chargedSec=this.chargedTimeRestore;
      this.unChargedSec=this.unChargedTimeRestore;
    }
    let time={total:this.totalSec,charged:this.chargedSec,uncharged:this.unChargedSec}
    this.viewCtrl.dismiss(time);

  }

}

import { Component,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController,ActionSheetController } from 'ionic-angular';

import {WeekModel} from '../../models/WeekModel';
import {ProjectModel} from '../../models/ProjectModel';
import {TimerProvider} from '../../providers/timer/timer';
import {ConversionProvider} from '../../providers/conversion/conversion';
/**
 * Generated class for the WeekDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'weekDetail'
})
@Component({
  selector: 'page-week-detail',
  templateUrl: 'week-detail.html',
})

export class WeekDetailPage implements OnInit {
  
  project=new ProjectModel('','','','','','',0,0,0,[]);
  index:number=0;
  week:WeekModel=new WeekModel('',new Date(),7);
  ngOnInit(){
    this.project=this.navParams.get('project');
    this.index=this.navParams.get('index');
    this.week.name=this.navParams.get('name');
    this.week.startDate=this.navParams.get('startDate');
    this.week.days=this.navParams.get('days');
  }
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,
    public timerProvider:TimerProvider,public modalCtrl: ModalController,public actionSheetCtrl:ActionSheetController,
  public conversionProvider:ConversionProvider) {
  }
    detail(day){
      const actionSheet=this.actionSheetCtrl.create({
        title:'Details',
        buttons:[
          {
            text:'Total Time: '+this.conversionProvider.getHours(day.totalSeconds)+'Hrs '+
            this.conversionProvider.getMinutes(day.totalSeconds)+' Min '+
            this.conversionProvider.getSeconds(day.totalSeconds)+' Sec',
          },
          {
            text:'Charged Time: '+this.conversionProvider.getHours(day.chargedSeconds)+'Hrs '+
            this.conversionProvider.getMinutes(day.chargedSeconds)+' Min '+
            this.conversionProvider.getSeconds(day.chargedSeconds)+' Sec',
          },
          {
            text:'UnCharged Time: '+this.conversionProvider.getHours(day.unChargedSeconds)+'Hrs '+
            this.conversionProvider.getMinutes(day.unChargedSeconds)+' Min '+
            this.conversionProvider.getSeconds(day.unChargedSeconds)+' Sec',
            role:'cancel'
          }
        ]
      });
      actionSheet.present();

    }

  ionViewDidLoad() {
    this.timerProvider.load(this.week.days);
  }

  toggleTimer(day){
    if(!day.dayActive){
      if(!this.timerProvider.timerActive){
        this.timerProvider.startTimer(day,false,this.project,this.index);
      }
       else {
 
                let alert = this.alertCtrl.create({
                    title: 'Oops!',
                    subTitle: 'You are already timing a project. You must stop it before timing a new project.',
                    buttons: ['OK']
                });
 
                alert.present();
    
            }
    }
    else{
      let totalTime= this.timerProvider.stopTimer(day,this.project,this.index);
      let modal = this.modalCtrl.create('stop', {
                totalTime:totalTime
            });
              modal.onDidDismiss((time)=>{
                day.totalSeconds=parseInt(time.total);
                day.chargedSeconds=parseInt(time.charged);
                day.unChargedSeconds=parseInt(time.uncharged);
              });
              modal.present();
    }
  }
}

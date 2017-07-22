import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import {WeekModel} from '../../models/WeekModel';
import{ProjectModel} from '../../models/ProjectModel';
import {ConversionProvider} from '../../providers/conversion/conversion';
import {ProjectProvider} from '../../providers/project/project';
/**
 * Generated class for the ProjectDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'projectDetail'
})
@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html',
})

export class ProjectDetailPage implements OnInit {
  project=new ProjectModel('','','','','','',0,0,0,[]);
  index:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl:ActionSheetController,
  public conversionProvider:ConversionProvider,public projectProvider:ProjectProvider) {
  }
     ngOnInit(){
       this.project=this.navParams.get('project');
       this.project.name=this.navParams.get('name');
       this.project.clientName=this.navParams.get('clientName');
       this.project.aboutProject=this.navParams.get('aboutProject');
       this.project.startDate=this.navParams.get('startDate');
       this.project.endDate=this.navParams.get('endDate');
       this.project.weeks=this.navParams.get('weeks');
       this.index=this.navParams.get('index');
   }

   ionViewWillLeave(){
     this.projectProvider.updateProject(this.index,this.project,this.project.name,this.project.clientName,
      this.project.aboutProject);
   }

  goToWeekDetail(week:WeekModel){
    this.goToWeek(week,this.project,this.index)
  }
  goToWeek(week,project,index){
    this.navCtrl.push('weekDetail',{name:week.name,startDate:week.startDate,days:week.days,project:project,index:index});
  }

  detail(week){
    const actionSheet=this.actionSheetCtrl.create({
    title:'Details',
    buttons:[
      {
        text:'Total Time: '+this.conversionProvider.getHours(week.totalSeconds)+'Hrs '+
        this.conversionProvider.getMinutes(week.totalSeconds)+' Min '+
        this.conversionProvider.getSeconds(week.totalSeconds)+' Sec',
      },
      {
        text:'Charged Time: '+this.conversionProvider.getHours(week.chargedSeconds)+'Hrs '+
        this.conversionProvider.getMinutes(week.chargedSeconds)+' Min '+
        this.conversionProvider.getSeconds(week.chargedSeconds)+' Sec',
      },
      {
        text:'UnCharged Time: '+this.conversionProvider.getHours(week.unChargedSeconds)+'Hrs '+
        this.conversionProvider.getMinutes(week.unChargedSeconds)+' Min '+
        this.conversionProvider.getSeconds(week.unChargedSeconds)+' Sec',
        role:'cancel'
      }
    ]
  });
  actionSheet.present();
  }
  

  getWeekTotalTime(week:WeekModel):number{
    let sum=0;
    for(let i=0;i<week.days.length;i++){
      sum+=week.days[i].totalSeconds;
    }
    return sum;
  }

  getWeekChargedTime(week:WeekModel):number{
    let sum=0;
    for(let i=0;i<week.days.length;i++){
      sum+=week.days[i].chargedSeconds;
    }
    return sum;
  }

  getWeekunChargedTime(week:WeekModel):number{
    let sum=0;
    for(let i=0;i<week.days.length;i++){
      sum+=week.days[i].unChargedSeconds;
    }
    return sum;
  }



  ionViewDidLoad() {
  }

  ionViewDidEnter(){
    let startDateString=this.project.startDate+" 00:00:00";
    let endDateString=this.project.endDate+" 00:00:00";
    let startDate=new Date(startDateString);
    let endDate=new Date(endDateString);
    let startDateTime=startDate.getTime();
    let endDateTime=endDate.getTime();
    let diff=Math.abs(endDateTime-startDateTime);
    let oneDay=1000*60*60*24;
    diff=Math.round(diff/oneDay);
    let numberOfWeeks=Math.floor(diff/7);
    
    for(let i=0;i<=numberOfWeeks;i++){
      this.project.weeks[i].totalSeconds=this.getWeekTotalTime(this.project.weeks[i]);
      this.project.weeks[i].chargedSeconds=this.getWeekChargedTime(this.project.weeks[i]);
      this.project.weeks[i].unChargedSeconds=this.getWeekunChargedTime(this.project.weeks[i]);
    }
  }

}

import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NgForm } from "@angular/forms";
import {ProjectProvider} from '../../providers/project/project';

import {WeekModel} from '../../models/WeekModel';
import {ProjectModel} from '../../models/ProjectModel'
/**
 * Generated class for the EditProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'newProject'
})
@Component({
  selector: 'page-new-project',
  templateUrl: 'new-project.html',
})
export class NewProjectPage implements OnInit{
  date:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public projectProvider:ProjectProvider) {

  }
  project:ProjectModel;
  ngOnInit(){
    
  }


  addProject(form:NgForm){

    let startDateString=form.value.startDate+" 00:00:00";
    let endDateString=form.value.endDate+" 00:00:00";

    let startDate=new Date(startDateString);
    let endDate=new Date(endDateString);

    let startDateTime=startDate.getTime();
    let endDateTime=endDate.getTime();
    let diff=Math.abs(endDateTime-startDateTime);
    
    let oneDay=1000*60*60*24;
    diff=Math.round(diff/oneDay);
    diff++;
    let numberOfWeeks=Math.floor(diff/7);
    let lastWeek=diff%7;
    
    let weeks:WeekModel[]=[];
    let i=0;

    for(i=0;i<numberOfWeeks;i++){
      let name="Week "+(i+1);
      var nextDate=new Date(startDate);
      let week=new WeekModel(name,nextDate,7);
      startDate.setDate(startDate.getDate()+7);
      weeks.push(week);  
  }
  
    if(lastWeek>0){
      let name="Week "+(i+1);
      let week=new WeekModel(name,startDate,lastWeek);
      weeks.push(week);
    }
    this.projectProvider.addProject(form.value.name,form.value.clientName,form.value.aboutProject,form.value.startDate,
    form.value.endDate,weeks);
    this.navCtrl.pop();
    
  }
}

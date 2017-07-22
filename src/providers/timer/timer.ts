import { Injectable } from '@angular/core';
import {ProjectModel} from '../../models/ProjectModel';
import {DateModel} from '../../models/DateModel';
import {ProjectProvider} from '../project/project';
@Injectable()
 export class TimerProvider {
   timerActive:boolean=false;
   timerInterval:any;
   secondElapsed:number=0;
   
   constructor(public projectProvider:ProjectProvider){}
   
   load(days){
   }

   startTimer(day:DateModel,restarting:boolean,project:ProjectModel,index:number){
     this.timerActive=true;
     if(!restarting){
       day.dayActive=true;
       day.lastChecked=new Date().getTime();   
     }

     this.timerInterval=setInterval(()=>{
      let now=new Date();
      // let timeDiff=now.getTime()-day.lastChecked;
      // let seconds=timeDiff/1000;
      day.totalSeconds++;
      day.lastChecked=now.getTime();
      this.secondElapsed=day.totalSeconds;
      this.projectProvider.updateProject(index,project,project.name,project.clientName,project.aboutProject);
    },1000);
      
   }

   stopTimer(day:DateModel,project:ProjectModel,index:number):number{
     clearInterval(this.timerInterval);
      day.dayActive=false;
      let totalTimeElapsed=this.secondElapsed;
      this.timerActive=false;
      this.timerInterval=false;
      this.secondElapsed=0;
      this.projectProvider.updateProject(index,project,project.name,project.clientName,project.aboutProject);
      return totalTimeElapsed;
     }
 }
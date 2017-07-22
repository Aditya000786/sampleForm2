import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {ProjectModel} from '../../models/ProjectModel';
import {WeekModel} from '../../models/WeekModel';
import {FirebaseWeekModel} from '../../models/FirebaseWeekModel';
import firebase from 'firebase';
import {ConversionProvider} from '../conversion/conversion';
/*
  Generated class for the ProjectProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProjectProvider {
  public projects:ProjectModel[]=[];

  public userProfileRef:firebase.database.Reference;  
  
  constructor(public http: Http,public conversionProvider:ConversionProvider) {
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.userProfileRef=firebase.database()
        .ref(`userProfile/${user.uid}`);
      }
    });
  }

    getProjectList():firebase.database.Reference{
    return this.userProfileRef.child('/projectList');
  }


  addProject(name:string,clientName:string,aboutProject:string,startDate:string,endDate:string,week:WeekModel[]=null){
    let project=new ProjectModel('',name,clientName,aboutProject,startDate,endDate,0,0,0,week);
    this.projects.push(project);
    let firebaseWeeks:FirebaseWeekModel[]=this.conversionProvider.getFirebaseWeek(week);
    let firebaseProject=this.userProfileRef.child('/projectList').push({
      name:name,
      clientName:clientName,
      aboutProject:aboutProject,
      startDate:startDate,
      endDate:endDate,
      week:firebaseWeeks,  
    });
    var projectId=firebaseProject.key;
  }

  updateProject(index:number,project:ProjectModel,name:string,clientName:string,aboutProject:string){
  this.projects[index]=new ProjectModel('',project.name,project.clientName,project.aboutProject,project.startDate,
  project.endDate,project.totalSeconds,project.chargedSeconds,project.unChargedSeconds,project.weeks);
  let firebaseWeeks:FirebaseWeekModel[]=this.conversionProvider.getFirebaseWeek(project.weeks);
  
  this.userProfileRef.child('/projectList/').child(project.id).set({
    name:name,
    clientName:clientName,
    aboutProject:aboutProject,
    startDate:project.startDate,
    endDate:project.endDate,
    week:firebaseWeeks,  
  },()=>{
    this.getProjectList();
  });
  }

  addProject2(name:string,clientName:string,aboutProject:string,startDate:string,endDate:string,week:WeekModel[]=null){
    let project=new ProjectModel('',name,clientName,aboutProject,startDate,endDate,0,0,0,week);
    this.projects.push(project);
  }



  getProjectTotalTime(project:ProjectModel):number{
    let sum=0;
    for(let i=0;i<project.weeks.length;i++){
      sum+=project.weeks[i].totalSeconds;
    }
    return sum;
  }

  getProjectChargedTime(project:ProjectModel):number{
    let sum=0;
    for(let i=0;i<project.weeks.length;i++){
      sum+=project.weeks[i].chargedSeconds;
    }
    return sum; 
  }

  getProjectUnchargedTime(project:ProjectModel):number{
    let sum=0;
    for(let i=0;i<project.weeks.length;i++){
      sum+=project.weeks[i].unChargedSeconds;
    }
    return sum;
  }

}

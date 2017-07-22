import { Component,OnInit } from '@angular/core';
import { NavController,ActionSheetController } from 'ionic-angular';
import {ConversionProvider} from '../../providers/conversion/conversion';
import {ProjectProvider} from '../../providers/project/project';
import {AuthProvider} from '../../providers/auth/auth';
import {ProjectModel} from '../../models/ProjectModel';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  projects:ProjectModel[]=[];
  isThereAnyProject:boolean;
  constructor(public navCtrl: NavController,public projectProvider:ProjectProvider,public actionSheetCtrl:ActionSheetController,
  public conversionProvider:ConversionProvider,public authProvider:AuthProvider) {
  }

  ngOnInit(){

  }
    ionViewWillEnter(){
    this.projectProvider.getProjectList().on('value', snapshot => {
    this.projects= [];
    snapshot.forEach( snap => {
      this.projects.push({
        id: snap.key,
        name: snap.val().name,
        clientName:snap.val().clientName,
        aboutProject:snap.val().aboutProject,
        startDate:snap.val().startDate,
        endDate:snap.val().endDate,
        totalSeconds:0,
        chargedSeconds:0,
        unChargedSeconds:0,
        weeks:this.conversionProvider.getWeek(snap.val().week)
      });
      return false
    });
  });


    if(this.projects.length==0){
      this.isThereAnyProject=false;
    }
    else{
      this.isThereAnyProject=true;
    }
    }

    newProject(): void{
    this.navCtrl.push('newProject',{mode:'New'});
  }  
  
  edit(project,i){
    this.navCtrl.push('editProject',{project:project,index:i});
  }
  
  detail(project){
    project.totalSeconds=this.projectProvider.getProjectTotalTime(project);
    project.chargedSeconds=this.projectProvider.getProjectChargedTime(project);
    project.unChargedSeconds=this.projectProvider.getProjectUnchargedTime(project);
    const actionSheet=this.actionSheetCtrl.create({
    title:'Details',
    buttons:[
      {
        text:'Total Time: '+this.conversionProvider.getHours(project.totalSeconds)+'Hrs '+
        this.conversionProvider.getMinutes(project.totalSeconds)+' Min '+
        this.conversionProvider.getSeconds(project.totalSeconds)+' Sec',
      },
      {
        text:'Charged Time: '+this.conversionProvider.getHours(project.chargedSeconds)+'Hrs '+
        this.conversionProvider.getMinutes(project.chargedSeconds)+' Min '+
        this.conversionProvider.getSeconds(project.chargedSeconds)+' Sec',
      },
      {
        text:'UnCharged Time: '+this.conversionProvider.getHours(project.unChargedSeconds)+'Hrs '+
        this.conversionProvider.getMinutes(project.unChargedSeconds)+' Min '+
        this.conversionProvider.getSeconds(project.unChargedSeconds)+' Sec',
        role:'cancel'
      }
    ]
  });
  actionSheet.present();
  }

  logout(){
    this.authProvider.logoutUser();
  }

  goToProject(project,index){
    this.navCtrl.push('projectDetail',{name:project.name,clientName:project.clientName,aboutProject:project.aboutProject,
    startDate:project.startDate,endDate:project.endDate,weeks:project.weeks,project:project,index:index});
  }

   ionViewDidEnter(){
   }
 
 
  }

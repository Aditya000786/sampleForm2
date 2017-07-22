import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {FormGroup,FormControl,Validators} from '@angular/forms';
import {ProjectModel} from '../../models/ProjectModel';
import {ProjectProvider} from '../../providers/project/project';
/**
 * Generated class for the EditProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'editProject'
})
@Component({
  selector: 'page-edit-project',
  templateUrl: 'edit-project.html',
})
export class EditProjectPage implements OnInit {

  project:ProjectModel;
  index:number;
  projectForm:FormGroup;
  ngOnInit(){
    this.project=this.navParams.get('project');
    this.index=this.navParams.get('index');
    this.initializeForm();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public projectProvider:ProjectProvider) {
  }
  onSubmit(){
    const value=this.projectForm.value;
    this.projectProvider.updateProject(this.index,this.project,value.name,value.clientName,value.aboutProject);
    this.navCtrl.popToRoot();
  }
  private initializeForm(){
    this.projectForm=new FormGroup({
      'name':new FormControl(this.project.name,Validators.required),
      'clientName':new FormControl(this.project.clientName,Validators.required),
      'aboutProject':new FormControl(this.project.aboutProject,Validators.required)
    });
  }

  ionViewDidLoad() {
  }


}

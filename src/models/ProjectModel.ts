import {WeekModel} from './WeekModel';
export class ProjectModel{
    constructor(public id:string,public name:string,public clientName:string,public aboutProject:string,
    public startDate:string,public endDate:string,public totalSeconds=0,public chargedSeconds=0,public unChargedSeconds=0,
    public weeks:WeekModel[]=null){}
}
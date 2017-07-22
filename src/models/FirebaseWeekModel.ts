import {DateModel} from './DateModel';
import {WeekModel} from './WeekModel';
export class FirebaseWeekModel{
    constructor(public name:string,public startDate:number,public numberOfDays:number,public totalSeconds=0,
        public chargedSeconds=0,public unChargedSeconds=0,public days:DateModel[]=[]){}
}
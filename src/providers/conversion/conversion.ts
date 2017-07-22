import {WeekModel} from '../../models/WeekModel';
import {WeekModel2} from '../../models/WeekModel2';
import {FirebaseWeekModel} from '../../models/FirebaseWeekModel';
export class ConversionProvider {

  getHours(seconds:number):number{
  let hrs=seconds/3600;
  return Math.floor(hrs);
  }
  
  getMinutes(seconds:number):number{
    let t=seconds%3600;
    let min=t/60;
    return Math.floor(min);
  }

  getSeconds(seconds:number):number{
    let t=seconds%3600;
    return Math.floor(t%60);
  }

  getFirebaseWeek(week:WeekModel[]):FirebaseWeekModel[]{
    let firebaseWeeks:FirebaseWeekModel[]=[];
    for(let i=0;i<week.length;i++){
      let firebaseWeek=new FirebaseWeekModel(week[i].name,week[i].startDate.getTime(),week[i].numberOfDays,
      week[i].totalSeconds,week[i].chargedSeconds,week[i].unChargedSeconds,week[i].days);
      firebaseWeeks.push(firebaseWeek);
    }
    return firebaseWeeks.slice();
  }

  getWeek(firebaseWeeks:FirebaseWeekModel[]):WeekModel[]{
    let weeks:WeekModel[]=[];
    for(let i=0;i<firebaseWeeks.length;i++){
      
    let week=new WeekModel2(firebaseWeeks[i].name,new Date(firebaseWeeks[i].startDate),firebaseWeeks[i].numberOfDays,
    firebaseWeeks[i].totalSeconds,firebaseWeeks[i].chargedSeconds,firebaseWeeks[i].unChargedSeconds,
    firebaseWeeks[i].days);
    weeks.push(week);
    }
  return weeks.slice();
  }

  
}

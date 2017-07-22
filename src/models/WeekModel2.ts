import {DateModel} from './DateModel';
export class WeekModel2{
    constructor(public name:string,public startDate:Date,public numberOfDays:number,public totalSeconds,
        public chargedSeconds,public unChargedSeconds,public days:DateModel[]){
        // console.log("startDate="+startDate);
        // var weekday = new Array(7);
        // weekday[0] =  "Sunday";
        // weekday[1] = "Monday";
        // weekday[2] = "Tuesday";
        // weekday[3] = "Wednesday";
        // weekday[4] = "Thursday";
        // weekday[5] = "Friday";
        // weekday[6] = "Saturday";
        // // days=[];
        // let myDays:DateModel[];
        // // for(let i=0;i<numberOfDays;i++){
        // //     console.log("numberOFDasy="+numberOfDays);
        // //     console.log("i="+i);
        // //     var currentDate=new Date(startDate);
        // //     let day:DateModel;
            
        // //     // let day=new DateModel(weekday[currentDate.getDay()],currentDate.getTime(),currentDate.getTime());
        // //     startDate.setDate(startDate.getDate()+1);
        // //     days.push(day);
        // // }
        // myDays=days;
        // console.log("Out of WeekModel");
        // startDate.setDate(startDate.getDate()-numberOfDays);    
        
        // // console.log("startDate="+startDate);
    }
}
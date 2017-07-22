export class DateModel{
    constructor(public name:string,public date:number,public lastChecked:number,public dayActive:boolean=false,
        public totalSeconds:number=0,public unChargedSeconds:number=0,public chargedSeconds:number=0){}
}
import { Pipe,Injectable } from '@angular/core';

/**
 * Generated class for the HoursMinutesSecondsPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'hoursminutesseconds',
})
@Injectable()
export class HoursMinutesSecondsPipe {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value, ...args) {
    var hours=Math.floor(value/3600);
    let t=value%3600;
    var min=Math.floor(t/60);
    var sec=Math.floor(t%60);
    return hours + "hrs, " +min +" mins, "+sec +" secs";
  }
}

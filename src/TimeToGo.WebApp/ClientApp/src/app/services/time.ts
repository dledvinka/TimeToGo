export class Time {
    multiplier = 1;
    hours: number;
    minutes: number;

    constructor(multiplier: number, hours: number, minutes: number) {
      this.multiplier = multiplier;
      this.hours = hours;
      this.minutes = minutes;
    }
  
    static parse(fname: string): Time {
      return new Time(1, 1, 2);
    }

    add(other: Time){
      const thisMinutes = (this.minutes + 60 * this.hours) * this.multiplier;
      const otherMinutes = (other.minutes + 60 * other.hours) * other.multiplier;
      const sumMinutes = thisMinutes + otherMinutes;
      const absSumMinutes = Math.abs(sumMinutes);

      const multiplier =  sumMinutes < 0 ? -1 : 1;
      const hours = Math.floor(absSumMinutes / 60);
      const minutes = absSumMinutes % 60;

      return new Time(multiplier, hours, minutes);
    }
  }
export class Time {
    multiplier = 1;
    hours: number;
    minutes: number;
    static readonly zero = new Time(1, 0, 0);

    constructor(multiplier: number, hours: number, minutes: number) {
      this.multiplier = multiplier;
      this.hours = hours;
      this.minutes = minutes;
    }
  
    static parse(str: string): Time {
      if (!str) {
        return this.zero;
      }
      
      if (!str.includes(":")) {
        return this.zero;
      }

      const parts = str.split(":");

      if (parts.length != 2) {
        return this.zero;
      }

      const hours = Number(parts[0]);
      const minutes = Number(parts[1]);

      if (hours === NaN || minutes === NaN) {
        return this.zero;
      }

      const multiplier = (hours < 0) || (parts[0].includes('-')) ? -1 : 1;
      const absHours = Math.abs(hours);

      return new Time(multiplier, absHours, minutes);
    }

    add(other: Time): Time {
      const thisMinutes = (this.minutes + 60 * this.hours) * this.multiplier;
      const otherMinutes = (other.minutes + 60 * other.hours) * other.multiplier;
      const sumMinutes = thisMinutes + otherMinutes;
      const absSumMinutes = Math.abs(sumMinutes);

      const multiplier =  sumMinutes < 0 ? -1 : 1;
      const hours = Math.floor(absSumMinutes / 60);
      const minutes = absSumMinutes % 60;

      return new Time(multiplier, hours, minutes);
    }

    substract(other: Time): Time {
      return this.add(other.negate());
    }

    negate(): Time {
      return new Time(-this.multiplier, this.hours, this.minutes);
    }

    asString() : string {
      return (this.multiplier < 0 ? "-" : "") + this.hours.toString() + ":" + this.zeroPad(this.minutes, 2);
    }

    private zeroPad(num: number, places: number): string {
      return String(num).padStart(places, '0')
    }
  }
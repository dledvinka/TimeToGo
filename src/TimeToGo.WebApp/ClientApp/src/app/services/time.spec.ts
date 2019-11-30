import { Time } from './time';

describe('Time', () => {
  it('should create an instance', () => {
    expect(new Time(1, 1, 1)).toBeTruthy();
  });

  it('should correctly parse 1:20', () => {
    expect(Time.parse('1:20')).toEqual({ multiplier: 1, hours: 1, minutes: 20} as Time);
  });

  it('should correctly parse 01:20', () => {
    expect(Time.parse('01:20')).toEqual({ multiplier: 1, hours: 1, minutes: 20} as Time);
  });

  it('should correctly parse -1:20', () => {
    expect(Time.parse('-1:20')).toEqual({ multiplier: -1, hours: 1, minutes: 20} as Time);
  });

  it('should correctly parse -01:20', () => {
    expect(Time.parse('-01:20')).toEqual({ multiplier: -1, hours: 1, minutes: 20} as Time);
  });

  it('should add 1:20 and 1:20 as 2:40', () => {
    const a = new Time(1, 1, 20);
    const b = new Time(1, 1, 20);
    expect(a.add(b)).toEqual(new Time(1, 2, 40));
  });

  it('should add 1:20 and -1:20 to 0:00', () => {
    const a = new Time(1, 1, 20);
    const b = new Time(-1, 1, 20);
    expect(a.add(b)).toEqual(new Time(1, 0, 0));
  });

  it('should add -1:20 and -1:20 to -2:40', () => {
    const a = new Time(-1, 1, 20);
    const b = new Time(-1, 1, 20);
    expect(a.add(b)).toEqual(new Time(-1, 2, 40));
  });
});

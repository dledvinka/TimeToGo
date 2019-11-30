import { Time } from './time';

describe('Time', () => {
  it('should create an instance', () => {
    expect(new Time(1, 1, 1)).toBeTruthy();
  });

  it('should correctly parse 1:20', () => {
    expect(Time.parse('1:20')).toEqual(new Time(1, 1, 20));
  });

  it('should correctly parse 10:07', () => {
    expect(Time.parse('10:07')).toEqual(new Time(1, 10, 7));
  });

  it('should correctly parse -10:07', () => {
    expect(Time.parse('-10:07')).toEqual(new Time(-1, 10, 7));
  });

  it('should correctly parse 01:20', () => {
    expect(Time.parse('01:20')).toEqual(new Time(1, 1, 20));
  });

  it('should correctly parse -1:20', () => {
    expect(Time.parse('-1:20')).toEqual(new Time(-1, 1, 20));
  });

  it('should correctly parse -01:20', () => {
    expect(Time.parse('-01:20')).toEqual(new Time(-1, 1, 20));
  });

  it('should correctly parse 0:00', () => {
    expect(Time.parse('0:00')).toEqual(new Time(1, 0, 0));
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

  it('should add -1:20 and 1:20 to 0:00', () => {
    const a = new Time(-1, 1, 20);
    const b = new Time(1, 1, 20);
    expect(a.add(b)).toEqual(new Time(1, 0, 0));
  });

  it('should add -1:20 and -1:20 to -2:40', () => {
    const a = new Time(-1, 1, 20);
    const b = new Time(-1, 1, 20);
    expect(a.add(b)).toEqual(new Time(-1, 2, 40));
  });

  it('1:20 minus 0:21 should be 0:59', () => {
    const a = new Time(1, 1, 20);
    const b = new Time(1, 0, 21);
    expect(a.substract(b)).toEqual(new Time(1, 0, 59));
  });

  it('1:20 minus 1:50 should be -0:30', () => {
    const a = new Time(1, 1, 20);
    const b = new Time(1, 1, 50);
    expect(a.substract(b)).toEqual(new Time(-1, 0, 30));
  });

  it('1:20 should become 1:20 as string', () => {
    const a = new Time(1, 1, 20);
    expect(a.asString()).toEqual("1:20");
  });
  
  it('0:20 should become 0:20 as string', () => {
    const a = new Time(1, 0, 20);
    expect(a.asString()).toEqual("0:20");
  });

  it('-1:20 should become -1:20 as string', () => {
    const a = new Time(-1, 1, 20);
    expect(a.asString()).toEqual("-1:20");
  });
  
  it('-0:20 should become -0:20 as string', () => {
    const a = new Time(-1, 0, 20);
    expect(a.asString()).toEqual("-0:20");
  });

  it('15:50 minus 8:20 minus 0:30 should be 7:00', () => {
    const a = new Time(1, 15, 50);
    const b = new Time(1, 8, 20);
    const c = new Time(1, 0, 30);
    expect(a.substract(b).substract(c)).toEqual(new Time(1, 7, 0));
  });

  it('8:00 minus 7:00 should be 1:00', () => {
    const a = new Time(1, 8, 0);
    const b = new Time(1, 7, 0);
    expect(a.substract(b)).toEqual(new Time(1, 1, 0));
  });
});

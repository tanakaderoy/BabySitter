import BabysitterUtil from '../BabySitterUtil';

describe('Babysitter Util Tests', () => {
  it('Can convert 5 PM to hour', () => {
    const hours = BabysitterUtil.convertTimeStrToHrs('5 PM');

    expect(hours).toEqual(5);
  });

  it('can convert 2 AM to hour', () => {
    const hour = BabysitterUtil.convertTimeStrToHrs('2 AM');
    expect(hour).toEqual(14);
  });
  it('can show error when starting before 5 PM', () => {
    expect(() => BabysitterUtil.calculate('4 PM', '11 PM')).toThrow(
      `Can't start before 5pm`,
    );
  });
  it('can show error when leaving after 4 AM', () => {
    expect(() => BabysitterUtil.calculate('5 PM', '5 AM')).toThrow(
      `Can't Leave after 4am`,
    );
  });

  it('can calculate total pay for 4 hours no bedtime', () => {
    const pay = BabysitterUtil.calculate('5 PM', '9 PM');
    expect(pay).toEqual(48);
  });
  it('can calculate total pay for full shift with bedtime', () => {
    const pay = BabysitterUtil.calculate('5 PM', '4 AM', '9 PM');
    expect(pay).toEqual(136);
  });
  it('can calculate total pay for full shift with no bedtime', () => {
    const pay = BabysitterUtil.calculate('5 PM', '4 AM');

    expect(pay).toEqual(164);
  });
});

import BabysitterUtil from '../BabySitterUtil';

describe('Babysitter Util Tests', () => {
  it('Can convert 5PM to 5', () => {
    const hours = BabysitterUtil.convertTimeStrToHrs('5 PM');

    expect(hours).toEqual(5);
  });
});

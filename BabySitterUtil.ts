export default class BabysitterUtil {
  static EARLY_START = '5 PM';
  static LATEST_LEAVE = '4 AM';
  static BEFORE_BED_PAY = 12;
  static AFTER_BED_PAY = 8;
  static AFTER_MIDNIGHT_PAY = 16;

  static calculate(
    startTimeStr: string,
    endTimeStr: string,
    bedTimeStr?: string,
  ): number {
    const bedTStr = bedTimeStr ? bedTimeStr : endTimeStr;

    let start = BabysitterUtil.convertTimeStrToHrs(startTimeStr),
      end = BabysitterUtil.convertTimeStrToHrs(endTimeStr),
      bed = BabysitterUtil.convertTimeStrToHrs(bedTStr),
      midnight = 12;

    let error = '';
    if (
      start < BabysitterUtil.convertTimeStrToHrs(BabysitterUtil.EARLY_START)
    ) {
      error += "Can't start before 5pm\n";
    }
    if (end > this.convertTimeStrToHrs(BabysitterUtil.LATEST_LEAVE)) {
      error += "Can't Leave after 4am\n";
    }

    if (start >= end) {
      error += "Can't start after you leave\n";
    } else if (bed < start || bed > end) {
      error += 'Bedtime is in between the shift\n';
    }

    if (error.length > 1) {
      throw new Error(error);
    }

    console.log(start, bed, end);
    let pay = 0;
    if (end > midnight) {
      pay =
        (bed - start) * BabysitterUtil.BEFORE_BED_PAY +
        (midnight - bed) * BabysitterUtil.AFTER_BED_PAY +
        (end - midnight) * BabysitterUtil.AFTER_MIDNIGHT_PAY;
    } else {
      pay =
        (bed - start) * BabysitterUtil.BEFORE_BED_PAY +
        (end - bed) * BabysitterUtil.AFTER_BED_PAY;
    }

    return pay;
  }

  static convertTimeStrToHrs = (timeStr: string): number => {
    console.log(timeStr);

    let hours = parseInt(timeStr.split(' ')[0]);

    if (timeStr.includes('AM') && hours !== 12) {
      hours += 12;
    }

    return hours;
  };
}


export default class DateUtils {

    static toShortString(date: Date) {
        return this.getNumeric(date.getDate()) + "." + 
            this.getNumeric(date.getMonth(), true) + "." + 
            this.getNumeric(date.getFullYear());
    }

    private static getNumeric(number: number, increment?: Boolean): string {
        if (increment) {
            number += 1;
        }
        if (number < 10) {
            return "0" + number;
        }
        return number.toString()
    }
}
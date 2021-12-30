import StringUtils from "../../Utils/StringUtils";

export default class KeyWithCounter {
    
    key!: string;

    name!: string;

    count!: number;

    constructor(name: string) {
        this.key = StringUtils.clean(name);
        this.name = name;
        this.count = 1;
    }
}

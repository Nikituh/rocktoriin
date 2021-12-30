import StringUtils from "../../Utils/StringUtils";
import KeyWithCounter from "./KeyWithCounter";

export default class MostAskedItem {

    key!: string;
    
    name!: string;

    date!: Date;
    
    subgroup!: KeyWithCounter[];
    
    add(key: string) {
        const found = this.subgroup.find(((existing: KeyWithCounter) => existing.key === StringUtils.clean(key)));
        if (found) {
            found.count++;
        } else {
            this.subgroup.push(new KeyWithCounter(key));
        }
    }
       
    public static subgroupTotal(item: MostAskedItem): number {
        let result = 0;

        item.subgroup.forEach((song: KeyWithCounter) => {
            result += song.count;
        });

        return result;
    }
}
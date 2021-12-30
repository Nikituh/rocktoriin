
import Question from "../Question";
import KeyWithCounter from "./KeyWithCounter";
import MostAskedItem from "./MostAskedItem";

import StringUtils from "../../Utils/StringUtils";

export default class Song extends MostAskedItem {
    
    static from(question: Question): Song {
        const result = new Song();
        result.name = question.song ?? "-";
        result.key = StringUtils.clean(result.name);
        result.date = question.date!;

        result.subgroup = [];

        if (question.artist) {
            result.subgroup.push(new KeyWithCounter(question.artist));
        }
        
        return result;
    }
}

import Question from "../Question";
import MostAskedItem from "./MostAskedItem";

import StringUtils from "../../Utils/StringUtils";

export default class Artist extends MostAskedItem {
    
    static from(question: Question): Artist | null {

        if (!question.artist) {
            return null;
        }

        const artist = new Artist();
        artist.key = StringUtils.clean(question.artist);
        artist.name = question.artist;
        artist.date = question.date!;
        
        artist.subgroup = [];

        return artist;
    }
}
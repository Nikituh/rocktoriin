import Question from "../Question";
import KeyWithCounter from "./KeyWithCounter";

export default class Song {

    key!: string;
    
    name!: string;

    artists!: KeyWithCounter[];
    
    static from(question: Question): Song {
        const result = new Song();
        result.name = question.song ?? "-";

        result.artists = [];
        if (question.artist) {
            result.artists.push(new KeyWithCounter(question.artist));
        }
        
        return result;
    }

    add(key: string) {
        const found = this.artists.find(((existing: KeyWithCounter) => existing.name === key));
        if (found) {
            found.count++;
        } else {
            this.artists.push(new KeyWithCounter(key));
        }
    }

    static totalArtistsOf(song: Song): number {
        return song.artists.length;
    }
    
}
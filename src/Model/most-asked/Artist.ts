import Question from "../Question";
import KeyWithCounter from "./KeyWithCounter";

export default class Artist {
    
    key!: string;

    name!: string;

    songs!: KeyWithCounter[];

    static from(question: Question): Artist | null {

        if (!question.artist) {
            return null;
        }
        const artist = new Artist();
        artist.key = question.artist.toLowerCase().trim();
        artist.name = question.artist;
        artist.songs = [];

        return artist;
    }

    add(song: string) {
        const found = this.songs.find(((existing: KeyWithCounter) => existing.name === song));
        if (found) {
            found.count++;
        } else {
            this.songs.push(new KeyWithCounter(song));
        }
    }
       
    public static totalSongsOf(artist: Artist): number {
        let result = 0;

        artist.songs.forEach((song: KeyWithCounter) => {
            result += song.count;
        });

        return result;
    }
}
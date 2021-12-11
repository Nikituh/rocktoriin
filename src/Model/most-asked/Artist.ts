import Question from "../Question";

export default class Artist {
    
    key!: string;

    name!: string;

    songs: string[] = [];

    static from(question: Question): Artist | null {

        if (!question.artist) {
            return null;
        }
        const artist = new Artist();
        artist.key = question.artist.toLowerCase().trim();
        artist.name = question.artist;
        
        return artist;
    }
    
}
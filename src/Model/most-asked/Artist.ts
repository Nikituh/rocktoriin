import Question from "../Question";

export class ArtistSong {
    
    name!: string;
    count!: number;

    constructor(name: string) {
        this.name = name;
        this.count = 1;
    }
}

export default class Artist {
    
    key!: string;

    name!: string;

    songs!: ArtistSong[];

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
        const found = this.songs.find(((existing: ArtistSong) => existing.name === song));
        if (found) {
            found.count++;
        } else {
            this.songs.push(new ArtistSong(song));
        }
    }
       
    public static totalSongsOf(artist: Artist): number {
        let result = 0;

        artist.songs.forEach((song: ArtistSong) => {
            result += song.count;
        });

        return result;
    }
}

import Artist from "./most-asked/Artist";

export default class Question {
    
    key?: string;

    artist?: string;

    song?: string;

    date?: string;

    artistContains(filter: string): Boolean {
        return this.containsLowerCase(this.artist, filter);
    }

    songContains(filter: string) {
        return this.containsLowerCase(this.song, filter);
    }

    containsLowerCase(source: string | undefined | null, filter: string): Boolean {
        if (!source) {
            return false;
        }
        return source.toLowerCase().includes(filter.toLowerCase())
    }

    static findPopularArtists(questions: Question[]): Artist[] {
        
        const artists: Artist[] = [];

        questions.forEach((question: Question) => {
            
            const artist = Artist.from(question);
            const song = question.song;
            if (!artist) {
                return;
            }
            if (!song) {
                return;
            }
            const existing = artists.find((item: Artist) => item.key === artist.key);
            if (existing) {
                existing.songs.push(song)
            } else {
                artist.songs.push(song);
                artists.push(artist);
            }
        });

        artists.sort((a: Artist, b: Artist) => {
            return b.songs.length - a.songs.length;
        });
        
        return artists.slice(0, 5);

    }
}
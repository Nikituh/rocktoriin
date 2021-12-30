
import StringUtils from "../Utils/StringUtils";
import Artist from "./most-asked/Artist";
import Song from "./most-asked/Song";

export default class Question {

    key?: string;

    artist?: string;

    song?: string;

    date?: Date;

    constructor(json: any) {
        this.key = json.key;
        this.artist = json.artist;
        this.song = json.song;

        const numbers = json.date.split(".");
        this.date = new Date(numbers[2], numbers[1] - 1, numbers[0]);
    }

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
                existing.add(song)
            } else {
                artist.add(song);
                artists.push(artist);
            }
        });

        return this.sortAndSlice(artists, Artist.subgroupTotal);
    }

    static findPopularSongs(questions: Question[]): Song[] {
        const songs: Song[] = [];

        questions.forEach((question: Question) => {

            const song = question.song;

            if (!song) {
                return;
            }
            if (song === "kõne") {
                return;
            }

            const existing = songs.find((item: Song) => item.name === song);
            if (existing) {
                existing.add(question.artist ?? "(Blank)");
            } else {
                songs.push(Song.from(question));
            }
        });

        return this.sortAndSlice(songs, Song.subgroupTotal)
    }

    static findMostPopularArtistForYear(questions: Question[]) {

        const forYear: any = {};
        questions.forEach((question: Question) => {
            const year = question.date!.getFullYear();
            if (forYear[year]) {
                forYear[year].push(question);
            } else {
                forYear[year] = [question];
            }
        });

        Object.keys(forYear).forEach((key: string) => {
            const questionForYear: Question[] = forYear[key];
            let sorted: any = {};

            questionForYear.forEach((question: Question) => {
                const key = StringUtils.clean(question.artist!);

                if (key === "") {
                    return;
                }
                if (key === "pildid") {
                    return;
                }

                if (sorted[key]) {
                    sorted[key] += 1;
                } else {
                    sorted[key] = 1;
                }
            });

            // Create items array
            var items = Object.keys(sorted).map(function(key) {
                return [key, sorted[key]];
            });

            // Sort the array based on the second element
            items.sort(function(first, second) {
                return second[1] - first[1];
            });

            console.log(key + ": " + items);
        });

    }
    private static sortAndSlice(array: any[], comparator: (input: any) => number) {
        array.sort((a: any, b: any) => {
            return comparator(b) - comparator(a);
        });

        return array.slice(0, 9);
    }
}
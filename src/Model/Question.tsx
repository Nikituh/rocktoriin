
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
}
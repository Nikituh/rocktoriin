
export default class KeyWithCounter {
    
    name!: string;
    
    count!: number;

    constructor(name: string) {
        this.name = name;
        this.count = 1;
    }
}

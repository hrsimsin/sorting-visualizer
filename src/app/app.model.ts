import { Bar, BarState } from "./components/bar-panel/bar.model";

export class App {
    numBars: number = 150;
    bars: Bar[];
    isSorting : boolean = false;

    constructor() {
        this.bars = Array.from(Array(this.numBars).keys()).map(value => new Bar(value + 1, BarState.unprocessed));
    }

    randomize() {
        this.shuffle(this.bars);
        this.isSorting = false;
    }

    toggleSorting(){
        this.isSorting = !this.isSorting;
    }

    private shuffle(array: Bar[]) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}
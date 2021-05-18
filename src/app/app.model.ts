import { BarPanel } from "./components/bar-panel/bar-panel.model";
import { Bar, BarState } from "./components/bar-panel/bar.model";
import { Header } from "./components/header/header.model";

export class App {
    numBars: number = 150;
    barPanel : BarPanel = new BarPanel([],false);
    header : Header = new Header();

    constructor() {
        this.barPanel.bars = Array.from(Array(this.numBars).keys()).map(value => new Bar(value + 1, BarState.unprocessed));
    }

    randomize() {
        this.barPanel.isShuffled = true;
        this.shuffle(this.barPanel.bars);
        this.barPanel = {...this.barPanel};   
        this.header.isSorting = false;
    }

    toggleSorting(){
        this.header.isSorting = !this.header.isSorting;
    }

    toggleMenu(){
        this.header.isMenuOpen = !this.header.isMenuOpen;
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
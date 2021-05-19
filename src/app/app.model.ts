import { BarPanel } from "./components/bar-panel/bar-panel.model";
import { Bar, BarState } from "./components/bar-panel/bar.model";
import { Header } from "./components/header/header.model";
import { Menu } from "./components/menu/menu.model";

export class App {
    barPanel : BarPanel = new BarPanel([],false);
    header : Header = new Header();
    menu : Menu = new Menu(50,150,1,3,20,1,['Bubble Sort','Selection Sort','Insertion Sort'],0);

    constructor() {
        this.barPanel.bars = Array.from(Array(this.menu.numBars).keys()).map(value => new Bar(value + 1, BarState.unprocessed));
        this.randomize();
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

    setNumBars(numBars:number){
        this.menu.numBars = numBars;
        this.barPanel.bars = Array.from(Array(this.menu.numBars).keys()).map(value => new Bar(value + 1, BarState.unprocessed));
        this.randomize();
    }

    setNumComps(numComps:number){
        this.menu.numComps = numComps;
    }

    getSortingAlgorithm(){
        return this.menu.algorithms[this.menu.selectedAlgorithmIndex];
    }

    changeSortingAlgorithm(){
        this.menu.selectedAlgorithmIndex = (this.menu.selectedAlgorithmIndex+1)%(this.menu.algorithms.length);
    }

    private shuffle(array: Bar[]) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}
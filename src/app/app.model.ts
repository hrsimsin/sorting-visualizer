import { BarPanel } from "./components/bar-panel/bar-panel.model";
import { Bar, BarState } from "./components/bar-panel/bar.model";
import { Header } from "./components/header/header.model";
import { Menu } from "./components/menu/menu.model";

export class App {

    static instance: App = new App();

    barPanel: BarPanel = new BarPanel([], false);
    header: Header = new Header();
    menu: Menu = new Menu(50, 150, 1, 70, 300, 1, ['Bubble Sort', 'Selection Sort', 'Insertion Sort'], 0);
    sortSteps: Array<Bar[]> = [];
    stepsHandler : any;

    constructor() {
        this.barPanel.bars = Array.from(Array(this.menu.numBars).keys()).map(value => new Bar(value + 1, BarState.unprocessed));
        this.randomize();
    }

    private bubbleSort() {
        const arr = JSON.parse(JSON.stringify(this.barPanel.bars));
        for (var i = 0; i < arr.length; ++i) {
            for (var j = 0; j < arr.length - 1 - i; ++j) {
                arr[j].state = BarState.processing;
                arr[j + 1].state = BarState.processing;
                this.saveSortState(arr);
                if (arr[j].value > arr[j + 1].value) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    this.saveSortState(arr);
                }
                arr[j].state = BarState.unprocessed;
                arr[j + 1].state = BarState.unprocessed;
            }
            arr[arr.length-i-1].state=BarState.processed;
        }
        arr[0].state=BarState.processed;
        arr[1].state=BarState.processed;
        this.saveSortState(arr);
    }

    private selectionSort() {

    }

    private insertionSort() {

    }


    private genSortSteps() {
        this.sortSteps = [];
        const sortFunctions = [this.bubbleSort.bind(this), this.selectionSort.bind(this), this.insertionSort.bind(this)];
        sortFunctions[this.menu.selectedAlgorithmIndex]();
    }

    private saveSortState(arr: Bar[]) {
        this.sortSteps.push(JSON.parse(JSON.stringify(arr)));
    }

    randomize() {
        this.barPanel.isShuffled = true;
        this.shuffle(this.barPanel.bars);
        this.barPanel.bars = this.barPanel.bars.map(item => {item.state=BarState.unprocessed; return item});
        this.barPanel = { ...this.barPanel };
        this.header.isSorting = false;
        this.genSortSteps();
    }

    toggleSorting() {
        this.header.isSorting = !this.header.isSorting;
        this.sortNext();    
    }

    private sortNext(){
        if(!this.header.isSorting)
            return;
        this.showNextStep();
        setTimeout(() => {
            this.sortNext();
        }, 1000/this.menu.numComps);
    }

    private showNextStep(){
        if(this.sortSteps.length!=0){
            this.barPanel.bars = (this.sortSteps.shift() as Bar[]);
            this.barPanel.isShuffled = false;
            this.barPanel = {...this.barPanel};
        }
    }

    toggleMenu() {
        this.header.isSorting = false;
        this.header.isMenuOpen = !this.header.isMenuOpen;
    }

    setNumBars(numBars: number) {
        this.menu.numBars = numBars;
        this.barPanel.bars = Array.from(Array(this.menu.numBars).keys()).map(value => new Bar(value + 1, BarState.unprocessed));
        this.randomize();
    }

    setNumComps(numComps: number) {
        this.menu.numComps = numComps;
    }

    getSortingAlgorithm() {
        return this.menu.algorithms[this.menu.selectedAlgorithmIndex];
    }

    changeSortingAlgorithm() {
        this.menu.selectedAlgorithmIndex = (this.menu.selectedAlgorithmIndex + 1) % (this.menu.algorithms.length);
        this.genSortSteps();
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
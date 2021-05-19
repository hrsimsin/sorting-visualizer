import { BarPanel } from "./components/bar-panel/bar-panel.model";
import { Bar, BarState } from "./components/bar-panel/bar.model";
import { Header } from "./components/header/header.model";
import { Menu } from "./components/menu/menu.model";

export class App {

    static instance: App = new App();

    barPanel: BarPanel = new BarPanel([], false);
    header: Header = new Header();
    menu: Menu = new Menu(25, 150, 1, 10, 1000, 1, ['Bubble Sort', 'Selection Sort', 'Insertion Sort'], 0);
    sortSteps: Array<Bar[]> = [];
    stepGenPending : boolean =false;

    constructor() {
        this.barPanel.bars = Array.from(Array(this.menu.numBars).keys()).map(value => new Bar(value + 1, BarState.unprocessed));
        this.randomize();
    }

    private bubbleSort(arr:Bar[]) {
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

    private selectionSort(arr:Bar[]) {
        for(var i=0;i<arr.length;++i){
            var pos=-1;
            var min=-1;
            for(var j=i;j<arr.length;++j){
                arr[j].state = BarState.processing;
                this.saveSortState(arr);
                arr[j].state=BarState.unprocessed;
                if(pos==-1){
                    pos=j;
                    min=arr[j].value;
                }
                else if(arr[j].value<min){
                    min=arr[j].value;
                    pos=j;
                }
            }
            arr[pos].state = BarState.processing;
            arr[i].state = BarState.processing;
            this.saveSortState(arr);
            var temp = arr[pos];
            arr[pos]=arr[i];
            arr[i]=temp;
            this.saveSortState(arr);
            arr[i].state = BarState.processed;
            if(i!==pos)
                arr[pos].state = BarState.unprocessed;
        }
        arr[arr.length-1].state = BarState.processed;
        this.saveSortState(arr);
    }

    private insertionSort(arr:Bar[]) {
        arr[0].state=BarState.processed;
        this.saveSortState(arr);
        for(var i=1;i<arr.length;++i){
            arr[i].state=BarState.processing;
            this.saveSortState(arr);
            var j=i;
            while(j>0 && arr[j-1].value > arr[j].value){
                var temp=arr[j];
                arr[j]=arr[j-1];
                arr[j-1]=temp;
                this.saveSortState(arr);
                --j;
            }
            arr[j].state=BarState.processed;
        }
        arr = arr.map((item:Bar) => {item.state=BarState.processed; return item});
        this.saveSortState(arr);
    }


    private genSortSteps() {
        this.sortSteps = [];
        const sortFunctions = [this.bubbleSort.bind(this), this.selectionSort.bind(this), this.insertionSort.bind(this)];
        this.barPanel.bars = this.barPanel.bars.map(item => {item.state=BarState.unprocessed; return item});
        sortFunctions[this.menu.selectedAlgorithmIndex](JSON.parse(JSON.stringify(this.barPanel.bars)));
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
        this.stepGenPending = true;
    }

    toggleSorting() {
        this.header.isSorting = !this.header.isSorting;
        if(this.header.isSorting && this.stepGenPending){
            this.stepGenPending=false;
            this.genSortSteps();
        }
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
        else{
            this.header.isSorting = false;
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
        this.stepGenPending = true;
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
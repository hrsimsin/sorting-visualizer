import { BarPanel } from "./components/bar-panel/bar-panel.model";
import { Bar, BarState } from "./components/bar-panel/bar.model";
import { Header, SortState } from "./components/header/header.model";
import { Menu } from "./components/menu/menu.model";

export class App {

    static instance: App = new App();

    barPanel: BarPanel = new BarPanel([], false);
    header: Header = new Header();
    menu: Menu = new Menu(50, 150, 1, 25, 1000, 1, ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort'], 0);
    sortSteps: Array<Bar[]> = [];
    stepGenPending: boolean = false;
    randomizeGenTimeout: any;
    menuGenTimeout: any;

    constructor() {
        this.barPanel.bars = Array.from(Array(this.menu.numBars).keys()).map(value => new Bar(value + 1, BarState.unprocessed));
        this.randomize();
        setTimeout(() => {
            this.genSortSteps();
            this.header.sortState = SortState.pause;
        }, 500);
        this.header.sortState = SortState.wait;
    }

    private bubbleSort(arr: Bar[]) {
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
            arr[arr.length - i - 1].state = BarState.processed;
        }
        arr[0].state = BarState.processed;
        arr[1].state = BarState.processed;
        this.saveSortState(arr);
    }

    private selectionSort(arr: Bar[]) {
        for (var i = 0; i < arr.length; ++i) {
            var pos = -1;
            var min = -1;
            for (var j = i; j < arr.length; ++j) {
                arr[j].state = BarState.processing;
                this.saveSortState(arr);
                arr[j].state = BarState.unprocessed;
                if (pos == -1) {
                    pos = j;
                    min = arr[j].value;
                }
                else if (arr[j].value < min) {
                    min = arr[j].value;
                    pos = j;
                }
            }
            arr[pos].state = BarState.processing;
            arr[i].state = BarState.processing;
            this.saveSortState(arr);
            var temp = arr[pos];
            arr[pos] = arr[i];
            arr[i] = temp;
            this.saveSortState(arr);
            arr[i].state = BarState.processed;
            if (i !== pos)
                arr[pos].state = BarState.unprocessed;
        }
        arr[arr.length - 1].state = BarState.processed;
        this.saveSortState(arr);
    }

    private insertionSort(arr: Bar[]) {
        arr[0].state = BarState.processed;
        this.saveSortState(arr);
        for (var i = 1; i < arr.length; ++i) {
            arr[i].state = BarState.processing;
            this.saveSortState(arr);
            var j = i;
            while (j > 0 && arr[j - 1].value > arr[j].value) {
                var temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                this.saveSortState(arr);
                --j;
            }
            arr[j].state = BarState.processed;
        }
        arr = arr.map((item: Bar) => { item.state = BarState.processed; return item });
        this.saveSortState(arr);
    }

    private swap(arr: Bar[], i: number, j: number) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    private heapify(arr: Bar[], n: number, i: number) {
        var largest = i;
        var l = 2 * i + 1;
        var r = 2 * i + 2;

        if (l < n && arr[l].value > arr[largest].value) {
            arr[l].state = BarState.processing;
            arr[largest].state = BarState.processing;
            this.saveSortState(arr);
            arr[l].state = BarState.unprocessed;
            arr[largest].state = BarState.unprocessed;
            largest = l;
        }

        if (r < n && arr[r].value > arr[largest].value){
            arr[r].state = BarState.processing;
            arr[largest].state = BarState.processing;
            this.saveSortState(arr);
            arr[r].state = BarState.unprocessed;
            arr[largest].state = BarState.unprocessed;
            largest = r;
        }

        if (largest != i) {
            this.swap(arr, i, largest);
            this.heapify(arr, n, largest);
        }
    }


    private heapSort(arr: Bar[]) {
        const n = arr.length;
        for (var i = Math.floor(n / 2) - 1; i >= 0; i--)
            this.heapify(arr, n, i);
        for (var i = n - 1; i > 0; i--) {
            this.swap(arr, 0, i);
            this.heapify(arr, i, 0);
            arr[i].state=BarState.processed;
        }
        arr = arr.map(item => { item.state = BarState.processed; return item });
        this.saveSortState(arr);
    }

    private merge(arr: Bar[], l: number, m: number, r: number, len: number) {
        const n1 = m - l + 1;
        const n2 = r - m;

        const L: Bar[] = Array(n1);
        const R: Bar[] = Array(n2);

        for (var i = 0; i < n1; i++)
            L[i] = arr[l + i];
        for (var j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j];

        var i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            L[i].state = BarState.processing;
            R[j].state = BarState.processing;
            if (L[i].value <= R[j].value) {


                arr[k] = L[i];

                this.saveSortState(arr);

                L[i].state = BarState.unprocessed;
                R[j].state = BarState.unprocessed;

                arr[k].state = (r == len - 1 && l == 0) ? BarState.processed : BarState.unprocessed;
                i++;
            }
            else {

                arr[k] = R[j];
                this.saveSortState(arr);

                L[i].state = BarState.unprocessed;
                R[j].state = BarState.unprocessed;


                arr[k].state = (r == len - 1 && l == 0) ? BarState.processed : BarState.unprocessed;
                j++;
            }
            this.saveSortState(arr);
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            arr[k].state = (r == len - 1 && l == 0) ? BarState.processed : BarState.unprocessed;
            this.saveSortState(arr);
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            arr[k].state = (r == len - 1 && l == 0) ? BarState.processed : BarState.unprocessed;
            this.saveSortState(arr);
            j++;
            k++;
        }
    }

    private mergeSortRec(arr: Bar[], l: number, r: number, len: number) {
        if (l >= r) {
            return;
        }
        const m = l + Math.floor((r - l) / 2);
        this.mergeSortRec(arr, l, m, len);
        this.mergeSortRec(arr, m + 1, r, len);
        this.merge(arr, l, m, r, len);
    }

    private partition(arr: Bar[], low: number, high: number): number {
        const pivot = arr[high];
        pivot.state = BarState.processing;
        var i = low - 1;
        for (var j = low; j <= high - 1; ++j) {
            this.saveSortState(arr);
            if (arr[j].value < pivot.value) {
                ++i;
                var temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
                this.saveSortState(arr);
            }
        }
        this.saveSortState(arr);
        var temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        pivot.state = BarState.unprocessed;
        return i + 1;
    }

    private quickSortRec(arr: Bar[], low: number, high: number) {
        if (low < high) {
            const pi = this.partition(arr, low, high);
            this.quickSortRec(arr, low, pi - 1);
            this.quickSortRec(arr, pi + 1, high);
        }
    }

    private mergeSort(arr: Bar[]) {
        this.mergeSortRec(arr, 0, arr.length - 1, arr.length);
    }

    private quickSort(arr: Bar[]) {
        this.quickSortRec(arr, 0, arr.length - 1);
        arr = arr.map(item => { item.state = BarState.processed; return item });
        this.saveSortState(arr);
    }


    private genSortSteps() {
        this.sortSteps = [];
        const sortFunctions = [this.bubbleSort.bind(this), this.selectionSort.bind(this), this.insertionSort.bind(this),
        this.mergeSort.bind(this), this.quickSort.bind(this), this.heapSort.bind(this)];
        this.barPanel.bars = this.barPanel.bars.map(item => { item.state = BarState.unprocessed; return item });
        sortFunctions[this.menu.selectedAlgorithmIndex](JSON.parse(JSON.stringify(this.barPanel.bars)));
    }

    private saveSortState(arr: Bar[]) {
        this.sortSteps.push(JSON.parse(JSON.stringify(arr)));
    }

    randomize() {
        this.header.sortState = SortState.pause;
        this.barPanel.isShuffled = true;
        this.shuffle(this.barPanel.bars);
        this.barPanel.bars = this.barPanel.bars.map(item => { item.state = BarState.unprocessed; return item });
        this.barPanel = { ...this.barPanel };
    }

    shuffleBars() {
        this.randomize();
        clearTimeout(this.randomizeGenTimeout);
        this.randomizeGenTimeout = setTimeout(() => {
            this.genSortSteps();
            this.header.sortState = SortState.pause;
        }, 500);
        this.header.sortState = SortState.wait;
    }

    toggleMenu() {
        this.header.sortState = SortState.pause;
        this.header.isMenuOpen = !this.header.isMenuOpen;
        if (!this.header.isMenuOpen && this.stepGenPending) {
            this.stepGenPending = false;
            clearTimeout(this.menuGenTimeout);
            this.menuGenTimeout = setTimeout(() => {
                this.genSortSteps();
                this.header.sortState = SortState.pause;
            }, 500);
            this.header.sortState = SortState.wait;
        }
    }

    toggleSorting() {
        if (this.header.sortState == SortState.wait)
            return;
        if (this.header.sortState == SortState.pause)
            this.header.sortState = SortState.play;
        else
            this.header.sortState = SortState.pause;
        this.sortNext();
    }

    private sortNext() {
        if (this.header.sortState != SortState.play)
            return;
        this.showNextStep();
        setTimeout(() => {
            this.sortNext();
        }, 1000 / this.menu.numComps);
    }

    private showNextStep() {
        if (this.sortSteps.length != 0) {
            this.barPanel.bars = (this.sortSteps.shift() as Bar[]);
            this.barPanel.isShuffled = false;
            this.barPanel = { ...this.barPanel };
        }
        else {
            this.header.sortState = SortState.pause;
        }
    }



    setNumBars(numBars: number) {
        this.menu.numBars = numBars;
        this.barPanel.bars = Array.from(Array(this.menu.numBars).keys()).map(value => new Bar(value + 1, BarState.unprocessed));
        this.randomize();
        this.stepGenPending = true;
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
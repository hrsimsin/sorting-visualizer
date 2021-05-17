import { Bar, BarState } from "./components/bar-panel/bar.model";

export class App{
    numBars : number = 150;
    bars : Bar[];

    constructor(){
        this.bars = Array.from(Array(this.numBars).keys()).map(value => new Bar(value+1,BarState.unprocessed));
    }
}
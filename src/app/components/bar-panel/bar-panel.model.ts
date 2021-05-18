import { Bar } from "./bar.model";

export class BarPanel{
    constructor(public bars:Bar[],public isShuffled:boolean){}
}
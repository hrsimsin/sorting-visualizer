export enum BarState {unprocessed,processing,processed}

export class Bar{
    constructor(public value:number,public state:BarState){}
}
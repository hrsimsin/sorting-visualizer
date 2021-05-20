export enum SortState {play,pause,wait};

export class Header{
    sortState : SortState = SortState.pause;
    isMenuOpen : boolean = false;
}
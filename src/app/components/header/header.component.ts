import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: { class: 'header' }
})
export class HeaderComponent implements OnInit {

  @Output() randomizeClicked : EventEmitter<void> = new EventEmitter();
  @Output() toggleSortingClicked : EventEmitter<void> = new EventEmitter();
  @Input() isSorting : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  randomize(){
    this.randomizeClicked.emit();
  }

  toggleSorting(){
    this.toggleSortingClicked.emit();
  }

}

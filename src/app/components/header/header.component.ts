import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Header, SortState } from './header.model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host:{class:'header'},
  animations:[
    trigger('buttonShowHide',
    [
      transition(':enter',[
        style({
          transform:'scale(0)'
        }),
        animate('300ms 0s cubic-bezier(0.165, 0.84, 0.44, 1)',style({
          transform:'scale(1)'
        }))
      ]),
      transition(':leave',[
        animate('250ms 0s cubic-bezier(0.55, 0.085, 0.68, 0.53)',style({
          transform:'scale(0)'
        }))
      ])
    ]
    ),
    trigger('buttonShow',
    [
      transition(':enter',[
        style({
          transform:'scale(0)'
        }),
        animate('300ms 0s cubic-bezier(0.165, 0.84, 0.44, 1)',style({
          transform:'scale(1)'
        }))
      ]),
      
    ]
    )
  ]
})
export class HeaderComponent implements OnInit {

  @Output() randomizeClicked : EventEmitter<void> = new EventEmitter();
  @Output() toggleSortingClicked : EventEmitter<void> = new EventEmitter();
  @Output() toggleMenuClicked : EventEmitter<void> = new EventEmitter();
  @Input() isSorting : boolean = false;

  @Input() header : Header = new Header();
  sortState = SortState;

  constructor() { }

  ngOnInit(): void {
  }

  randomize(){
    this.randomizeClicked.emit();
  }

  toggleSorting(){
    this.toggleSortingClicked.emit();
  }

  toggleMenu(){
    this.toggleMenuClicked.emit();
  }

}

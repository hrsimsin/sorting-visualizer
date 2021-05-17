import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Header } from './header.model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host:{class:'header'},
  animations:[
    trigger('showHide',[
      transition(':enter',[
        style({
          opacity:0,
          transform:'translateX(1vw)'
        }),
        animate('0.3s 0s cubic-bezier(0.165, 0.84, 0.44, 1)',style({
          opacity:1,
          transform:'translateX(0vw)'
        }))
      ]),
      transition(':leave',[
        animate('0.3s 0s cubic-bezier(0.165, 0.84, 0.44, 1)'),style({
          opacity:0,
          transform:'translateX(1vw)'
        })
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  @Output() randomizeClicked : EventEmitter<void> = new EventEmitter();
  @Output() toggleSortingClicked : EventEmitter<void> = new EventEmitter();
  @Output() toggleMenuClicked : EventEmitter<void> = new EventEmitter();
  @Input() isSorting : boolean = false;

  @Input() header : Header = new Header();

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

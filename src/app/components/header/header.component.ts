import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Header } from './header.model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host:{class:'header'}
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

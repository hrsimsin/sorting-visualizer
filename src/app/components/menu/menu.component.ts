import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host:{class:'menu'}
})
export class MenuComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
  }

}

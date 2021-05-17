import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host:{class:'menu'}
})
export class MenuComponent implements OnInit, OnChanges {

  @Input() isOpen: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if('isOpen' in changes){
      if(this.isOpen){
        
      }
      else{
        
      }
    }
  }

  ngOnInit(): void {
  }

}

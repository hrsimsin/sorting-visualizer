import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host:{class:'menu'},
  animations:[
    trigger('showHide',[
      transition(':enter',[
        style({
          opacity:0
        }),
        animate('5s 2s cubic-bezier(0.165, 0.84, 0.44, 1)',style({
          opacity:1
        }))
      ]),
      transition(':leave',[
        animate('5s 2s cubic-bezier(0.165, 0.84, 0.44, 1)'),style({
          opacity:0
        })
      ])
    ])
  ]
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

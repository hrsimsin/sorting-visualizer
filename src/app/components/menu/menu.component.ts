import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, query, sequence, stagger, state, style, transition, trigger } from '@angular/animations';
import { Menu } from './menu.model';
import { App } from 'src/app/app.model';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: { 
    class: 'menu'
  },
  animations: [
    trigger(
      'toggleMenu',
      [
        transition(':enter', [
          style({
            height: '0%'
          }),
          sequence([
            query('.menu-item',[
              style({transform:'scale(0)'})
            ]),
            animate('300ms 0s cubic-bezier(0.55, 0.085, 0.68, 0.53)', style({
              height: '100%'
            })),
            query('.menu-item',[
              stagger(30,[
                animate('100ms 0s cubic-bezier(0.55, 0.085, 0.68, 0.53)',style({
                  transform:'scale(1)'
                }))
              ])
            ])
          ]),
        ]),
        transition(':leave', [
          sequence([
            query('.menu-item',[
              stagger(30,[
                animate('50ms 0s cubic-bezier(0.55, 0.085, 0.68, 0.53)',style({
                  transform:'scale(0)'
                }))
              ])
            ]),
            animate('200ms 0ms cubic-bezier(0.165, 0.84, 0.44, 1)', style({
              height: '0%'
            }))
          ])
        ])
      ]
    )
  ]
})
export class MenuComponent implements OnInit {

  @HostBinding('@toggleMenu') animationTrigger: void;
  @Input() app : App = App.instance;

  constructor() { }

  ngOnInit(): void {
  }

}

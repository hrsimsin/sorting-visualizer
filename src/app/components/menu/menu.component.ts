import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: { 
    class: 'menu' ,
    '(@toggleMenu.start)' : 'toggleStart($event)',
    '(@toggleMenu.done)' : 'toggleEnd($event)'
  },
  animations: [
    trigger(
      'toggleMenu',
      [
        transition(':enter', [
          style({
            height: '0%'
          }),
          animate('300ms 0s cubic-bezier(0.55, 0.085, 0.68, 0.53)', style({
            height: '100%'
          }))
        ]),
        transition(':leave', [
          animate('250ms 0s cubic-bezier(0.165, 0.84, 0.44, 1)', style({
            height: '0%'
          }))
        ])
      ]
    )
  ]
})
export class MenuComponent implements OnInit {

  @HostBinding('@toggleMenu') animationTrigger: void;

  showMenuItems : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleStart(event:AnimationEvent){
    
  }

  toggleEnd(event:any){
    if(event.toState === null){
      console.log('Start item animation show');
      this.showMenuItems = true;
    }
  }

}

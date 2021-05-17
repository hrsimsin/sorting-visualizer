import { Component } from '@angular/core';
import { App } from './app.model';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('openClose',[
      state('open',style({
        height:'100%'
      })),
      state('closed',style({
        height:'0%'
      })),
      transition('open => closed', [
        animate('0.5s 0s cubic-bezier(0.165, 0.84, 0.44, 1)')
      ]),
      transition('closed => open', [
        animate('0.5s 0s cubic-bezier(0.165, 0.84, 0.44, 1)')
      ]),
    ])
  ]
})
export class AppComponent {
  app = new App();
}

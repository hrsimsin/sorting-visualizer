import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BarPanel } from './bar-panel.model';
import { Bar, BarState } from './bar.model';

@Component({
  selector: 'bar-panel',
  templateUrl: './bar-panel.component.html',
  animations: [
    trigger('verticalCollapse',
      [

        transition(':enter', [
          style({
            transform: 'scaleY(0)',
            'transform-origin': 'bottom'
          }),
          animate('0.15s', style({
            transform: 'scaleY(1)',
            'transform-origin': 'bottom'
          }))
        ]),
        transition(':leave', [
          style({
            transform: 'scaleY(1)',
            'transform-origin': 'bottom'
          }),
          animate('0.15s', style({
            transform: 'scaleY(0)',
            'transform-origin': 'bottom'
          }))
        ])
      ]
    )
  ]
})
export class BarPanelComponent implements OnInit, OnChanges {

  @Input() barPanel: BarPanel = new BarPanel([], false);
  barState = BarState;
  bars: Bar[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.barPanel.isShuffled) {
      this.bars = [];
      setTimeout(() => {
        this.bars = this.barPanel.bars;
      }, 155);
    }
    else {
      this.bars = this.barPanel.bars;
    }
  }

  ngOnInit(): void {
  }

  identify(index: number, item: Bar) {
    return item.value;
  }

}

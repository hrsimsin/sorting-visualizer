import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Bar, BarState } from './bar.model';

@Component({
  selector: 'bar-panel',
  templateUrl: './bar-panel.component.html',
  host:{class:'bar-panel'}
})
export class BarPanelComponent implements OnInit {

  @Input() bars : Bar[] = [];
  barState = BarState;

  constructor() { }

  ngOnInit(): void {
  }

}

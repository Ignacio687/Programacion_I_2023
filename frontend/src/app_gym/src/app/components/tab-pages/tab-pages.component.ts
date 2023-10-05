import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-pages',
  template: 'titlesData',
  templateUrl: './tab-pages.component.html',
  styleUrls: ['./tab-pages.component.css']
})
export class TabPagesComponent {
  @Input() titlesData: Object = {};
  constructor() { }
}

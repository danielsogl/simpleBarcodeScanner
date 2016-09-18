import { Component } from '@angular/core';
import {ScannerPage} from '../scanner/scanner';
import {HistoryPage} from '../history/history';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;

  constructor() {
    this.tab1Root = ScannerPage;
    this.tab2Root = HistoryPage;
  }
}

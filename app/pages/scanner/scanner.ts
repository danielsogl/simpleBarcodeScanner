import {Component} from '@angular/core';
import {Storage, SqlStorage, ToastController} from 'ionic-angular';
import {BarcodeScanner, Clipboard, InAppBrowser} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/scanner/scanner.html'
})
export class ScannerPage {


  data: any;
  scannerFinished: boolean;
  storage: Storage = null;
  cancelled: boolean;

  constructor(public toastCtrl: ToastController) {
    this.scanBarcode();
  }

  scanBarcode() {
    this.scannerFinished = false;
    this.data = null;
    BarcodeScanner.scan({"showFlipCameraButton": true, "preferFrontCamera": false}).then((barcodeData) => {
      if (!barcodeData.cancelled) {
        this.data = barcodeData;
        this.saveToHistory();
        this.cancelled = false;
        this.scannerFinished = true;
      } else {
        this.cancelled = true;
        this.scannerFinished = true;
      }
    }, (err) => {
      console.log(err);
    });
  }

  saveToHistory() {
    this.storage = new Storage(SqlStorage);
    this.storage.query("INSERT INTO history (codeText, coderType) VALUES (?,?)", [this.data.text, this.data.format]);
  }

  saveToClipboard(text) {
    Clipboard.copy(text);
    let toast = this.toastCtrl.create({
      message: 'Saved to Clipboard',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  openBrowser(text) {
    var url = "https://www.google.de/#q=" + text;
    InAppBrowser.open(url, '_self');
  }


}

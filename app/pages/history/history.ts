import {Component} from '@angular/core';
import {Storage, SqlStorage, ToastController} from 'ionic-angular';
import {Clipboard, InAppBrowser} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/history/history.html',
})
export class HistoryPage {

  private storage: Storage = null;
  private historyData: Array<Object>;
  private loading: boolean;
  private favs: boolean;

  constructor(public toastCtrl: ToastController) {
    this.storage = new Storage(SqlStorage);
    this.historyData = [];
    this.checkDB();
  }

  checkDB() {
    this.loading = true;
    this.storage.query("SELECT * FROM history").then((data) => {
      if (data.res.rows.length > 0) {
        this.favs = true;
        this.historyData = [];
        for (let i = 0; i < data.res.rows.length; i++) {
          this.historyData.push({
            text: data.res.rows.item(i).codeText,
            type: data.res.rows.item(i).coderType
          });
        }
        console.log(this.historyData);
        this.loading = false;
      } else {
        console.log("Empty Database!");
        this.loading = false;
        this.favs = false;
      }
    }, (error) => {
      console.log(error);
    });
  }

  deleteEntry(data) {
    this.storage.query('DELETE FROM history WHERE codeText = \"' + data.text + '\"');
    var index = this.historyData.indexOf(data);
    if (index > -1)
      this.historyData.splice(index, 1);
    this.checkDB();
  }

  pulltoRefresh(refresher) {
    this.storage.query("SELECT * FROM history").then((data) => {
      if (data.res.rows.length > 0) {
        this.favs = true;
        this.historyData = [];
        for (let i = 0; i < data.res.rows.length; i++) {
          this.historyData.push({
            text: data.res.rows.item(i).codeText,
            type: data.res.rows.item(i).coderType
          });
        }
        console.log(this.historyData);
        this.loading = false;
        refresher.complete();
      } else {
        console.log("Empty Database!");
        this.loading = false;
        this.favs = false;
        refresher.complete();
      }
    }, (error) => {
      console.log(error);
    });
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

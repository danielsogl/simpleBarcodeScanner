import {Component} from '@angular/core';
import {Platform, ionicBootstrap, Storage, SqlStorage} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
declare var AdMob: any;

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  public rootPage: any;
  public admobId: any;
  private storage: Storage = null;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;
    this.storage = new Storage(SqlStorage);

    platform.ready().then(() => {
      this.initAdMob();
      this.createBanner();
      StatusBar.backgroundColorByHexString('#387ef5');
      this.storage.query('CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, codeText TEXT, coderType TEXT)');
      Splashscreen.hide();
    });
  }

  initAdMob() {

    if (this.platform.is('ios')) {
      this.admobId = {
        banner: 'ca-app-pub-5903155652760586/8723715754'
      };
    }
    if (this.platform.is('android')) {
      this.admobId = {
        banner: 'ca-app-pub-5903155652760586/7246982551'
      }
    }
  }

  createBanner() {
    this.platform.ready().then(() => {
      if (AdMob) {
        AdMob.createBanner({
          adId: this.admobId.banner,
          autoShow: true,
          position: AdMob.AD_POSITION.BOTTOM_CENTER,
          isTesting: false
        });
      }
    });
  }
}

ionicBootstrap(MyApp);

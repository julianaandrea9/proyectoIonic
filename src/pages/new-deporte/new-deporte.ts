import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeporteServiceProvider } from '../../providers/deporte-service/deporte-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-new-deporte',
  templateUrl: 'new-deporte.html',
})
export class NewDeportePage {
  token: string;
  iddeporte: number;
  nombredeporte: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public deporteService: DeporteServiceProvider) {
    this.token = navParams.get('token');
  }

  newDeporte() {
    let postParams = {
       
    iddeporte: this.iddeporte,
    nombredeporte: this.nombredeporte,
    }
    this.deporteService.saveDeporte(this.token,postParams).then((pdct) => {
      alert(pdct["statusText"]);
      this.navCtrl.setRoot(HomePage, {
        token: this.token
      });    
    }).catch((err) => {
      console.log(err);
    })
  }

    ionViewDidLoad() {
    console.log('ionViewDidLoad NewDeportePage');
  }

}

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

  
    ionViewDidLoad() {
    console.log('ionViewDidLoad NewDeportePage');
  }

}

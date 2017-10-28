import { Component,NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from "../home/home";
import { Deporte } from '../../models/deporte';
import { DeporteServiceProvider } from '../../providers/deporte-service/deporte-service';

@IonicPage()
@Component({
  selector: 'page-edit-deporte',
  templateUrl: 'edit-deporte.html',
})
export class EditDeportePage {
  public token: string;
  public deporte: Deporte;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public deporteService: DeporteServiceProvider) {

    this.token = navParams.get('token');
    this.deporte = navParams.get('deporte');
  }


  updateDeporte() {

    if (!this.deporte.iddeporte) {
      return;
    }

    this.deporteService.updateDeporte(this.token, this.deporte.iddeporte, this.deporte)
      .then((pdct) => {
        alert('Se actualizó correctamente el deporte')
        this.navCtrl.setRoot(HomePage, {
          token: this.token
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

}

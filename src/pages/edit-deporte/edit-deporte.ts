import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

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
  public iddeporte: string;
  public nombredeporte: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public deporteService: DeporteServiceProvider) {

    this.token = navParams.get('token');
    this.deporte = navParams.get('deporte');
  }


  updateDeportes() {
    let postParams = {
      iddeporte: this.iddeporte,
      nombredeporte: this.nombredeporte
    }
    this.deporteService.updateDeportes(this.token, this.deporte.iddeporte, this.deporte)
      .then((user) => {
        let respuesta = JSON.parse(user["_body"]);
        this.editConfirm();
        this.navCtrl.setRoot(HomePage, {
          token: respuesta.token
        });
      }).catch((err) => {
        console.log(err);
      })
  }

  editConfirm() {
    const alert = this.alertCtrl.create({
      title: 'Actualizado',
      subTitle: 'El deporte se ha actualizado exitosamente',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}

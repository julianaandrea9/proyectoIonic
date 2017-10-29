import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DeporteServiceProvider } from '../../providers/deporte-service/deporte-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-new-deporte',
  templateUrl: 'new-deporte.html',
})
export class NewDeportePage {
  token: string;
  public iddeporte: string;
  public nombredeporte: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public deporteService: DeporteServiceProvider,
     public alertCtrl: AlertController,
     public navController: NavController) {
    this.token = navParams.get('token');
  }

  saveDeportes(token) {
    let postParams = {
      iddeporte: this.iddeporte,
      nombredeporte: this.nombredeporte
    }

    this.deporteService.saveDeportes(postParams)
      .then((user) => {
        let respuesta = JSON.parse(user["_body"]);
        this.createConfirm();
        this.navController.setRoot(HomePage, {
         token: respuesta.token
        });
      }).catch((err) => {
        console.log("error " + err);
      })
  }

  createConfirm() {
    const alert = this.alertCtrl.create({
      title: 'Registrado',
      subTitle: 'El deporte se ha registrado exitosamente',
      buttons: ['Aceptar']
    });
    alert.present();
  }
}

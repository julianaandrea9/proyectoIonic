import { Component } from '@angular/core';
import { Refresher } from "ionic-angular"
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { DeporteServiceProvider } from '../../providers/deporte-service/deporte-service';
import { Deporte } from '../../models/deporte';
import { NewDeportePage } from '../../pages/new-deporte/new-deporte';
import { EditDeportePage } from '../../pages/edit-deporte/edit-deporte';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DeporteServiceProvider],
})

export class HomePage {

  token: string;
  loadding: any
  newsData: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loaddingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public deporteProvider: DeporteServiceProvider) {

    this.loadding = this.loaddingCtrl.create({
      content: `<ion-spinner></ion-spinner>`
    })
    this.getData();
  }

  newDeporte() {
    this.navCtrl.push(NewDeportePage, {
      token: this.token
    });
  }

  getData() {
    // this.loadding.present();
    this.deporteProvider.getData().then((datos) => {
      this.newsData = datos;
      // this.loadding.dismiss();
    });
    this.deporteProvider.getJsonData().subscribe(

      result => {

        this.newsData = result;
        console.log("Sucess: " + this.newsData);

      }, err => {
        console.error("Error:" + err);
      },
      () => {
        console.log("Cerrando loading");
        this.loadding.dismiss();
        console.log("getData completed ");

      }

    )

  }

  recargar_pagina(refresher: Refresher) {
    console.log("Inicio del refresh");
    setTimeout(() => {
      console.log("Terminó el refresh");
      this.getData();
      refresher.complete();
    }, 1500)
  }

  ionViewDidLoad() {
    console.log('Bienvenido al HomePage');
  }

  deleteDeporte(id) {
    this.deleteConfirm((res) => {
      if (res) {
        this.deporteProvider.deleteDeporte(this.token, id)
          .then((pdct) => {
            this.getData();
          })
          .catch((err) => {
            console.log(err);
            alert("Error al eliminar el deporte");
          })
      }
    });
  }

  deleteConfirm(callback: any) {
    let alert = this.alertCtrl.create({
      title: 'Eliminar',
      message: 'Esta seguro que desea eliminar el deporte?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            return callback(false);
          }
        },
        {
          text: 'Si',
          handler: () => {
            return callback(true);
          }
        }
      ]
    });
    alert.present();
  }

  editDeporte(deporte) {
    this.navCtrl.push(EditDeportePage, {
      token: this.token,
      deporte: deporte
    })
  }

}
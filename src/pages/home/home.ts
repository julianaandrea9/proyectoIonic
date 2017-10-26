import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Refresher } from 'ionic-angular';
import { DeporteServiceProvider } from '../../providers/deporte-service/deporte-service';
import { NewDeportePage } from "../new-deporte/new-deporte";
import { Http,Headers,RequestOptions } from '@angular/http';
import { Deporte} from '../../models/deporte';
@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
  token: string;
  deporte: Array<Deporte>;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    public deporteServices: DeporteServiceProvider
  ) {
    this.token = navParams.get('token');
  }

  ngOnInit() {
    this.getDeportes();
  }

  refreshDeporte(refresher: Refresher) {
    this.deporteServices.getDeporte(this.token).then((pdct) => {
      let respuesta = JSON.parse(pdct["_body"]);
      this.deporte = respuesta.deporte;
      refresher.complete();
    }).catch((err) => {
      refresher.complete();
    })
  }

  newDeporte() {
    this.navCtrl.push(NewDeportePage, {
      token: this.token
    });
  }

  getDeportes() {
    this.deporteServices.getDeporte(this.token).then((pdct) => {
      let respuesta = JSON.parse(pdct["_body"]);
      this.deporte = respuesta.deporte;
    }).catch((err) => {
    })
  }

  //editProduct(product) {
 //   this.navCtrl.push(EditProductPage, {
   //   token: this.token,
     // productId: product._id,
      //product: product
   // })
  //}

  
  deleteDeporte(id) {
    this.deleteConfirm((res) => {
      if (res) {
        this.deporteServices.deleteDeporte(this.token, id)
          .then((pdct) => {
            this.getDeportes();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    });
  }

  deleteConfirm(callback: any) {
    let alert = this.alertCtrl.create({
      title: 'Eliminar',
      message: '¿Esta seguro que desea eliminar el deporte?',
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


  showDeporteList() {
    
    if (this.deporte.length == 0) {
      return false;
    }

    return true;
  }
}
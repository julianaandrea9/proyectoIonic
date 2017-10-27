import { Component } from '@angular/core';
import { Refresher } from "ionic-angular"
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

//creamos el proveedor
import {DeporteServiceProvider} from '../../providers/deporte-service/deporte-service';
import {Deporte} from '../../models/deporte';
import {NewDeportePage} from '../../pages/new-deporte/new-deporte';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DeporteServiceProvider],
})

export class HomePage {
 
 // camaras:Camara[] = [];
 token: string;
  loadding: any
  newsData: any//calculamos lo que nos va a retornar los servicios 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public  loaddingCtrl: LoadingController,
    public deporteProvider: DeporteServiceProvider) {

    this.loadding= this.loaddingCtrl.create({
      content:`<ion-spinner></ion-spinner>`
       })
    this.getData();
  let idUsuario = deporteProvider.getJsonData;
  
  }

  newDeporte(){
    this.navCtrl.push(NewDeportePage, {
      token: this.token
    });   
  }

  getData() {
   // this.loadding.present();
    this.deporteProvider.getData().then((datos)=>{
      this.newsData=datos;
     // this.loadding.dismiss();
    });     
    this.deporteProvider.getJsonData().subscribe(

      result=>{
        
        this.newsData=result;
        console.log("Sucess: "+ this.newsData);
       
      }, err =>{
        console.error("Error:"+ err);
      }, 
      ()=>{
        console.log("Cerrando loading");
        this.loadding.dismiss();
        console.log("getData completed ");
        
      }

    )
    
  }

  recargar_pagina(refresher:Refresher)
  {
    console.log("Inicio del refresh");
    setTimeout(()=>{
      console.log("Terminó el refresh");
     /* this.loadding= this.loaddingCtrl.create({
        content:`<ion-spinner></ion-spinner>`
         })*/
         
      this.getData();
      refresher.complete();
    }, 1500)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  borrar_deporte(idx:number){
    this.deporteProvider.deleteDeporte(idx, 1);
    this.newsData.splice(idx, 1);
  }

}
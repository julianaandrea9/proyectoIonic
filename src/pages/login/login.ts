import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LoginservicesProvider } from '../../providers/loginservices/loginservices'
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: string;
  public password: string;
  rootPage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loginService: LoginservicesProvider, public navController: NavController) {
  }

  login() {
    let postParams = {
      email: this.email,
      password: this.password
    }

    this.loginService.login(postParams)
      .then((user) => {
        let respuesta = JSON.parse(user["_body"]);
        console.log(respuesta);
        this.navController.setRoot(HomePage, {
         token: respuesta.token
        });
      }).catch((err) => {
        alert("error " + err);
      })
  }

}

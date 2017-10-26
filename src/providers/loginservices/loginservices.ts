import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginservicesProvider {

  headers: Headers;
  headersPost: Headers;
  options: RequestOptions;

  constructor(public http: Http) {
  }

  public login(postParams) {
   
    
    this.headersPost = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    let optionspost = new RequestOptions({
      headers: this.headersPost
    })

    return new Promise((resolve, reject) => {
      this.http.post('http://139.162.118.169:8080/proyectoAndroid/webresources/autenticacion', {
        email: postParams.email,
        password: postParams.password
      }, optionspost)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          resolve(err);
        });

    });
  }
}

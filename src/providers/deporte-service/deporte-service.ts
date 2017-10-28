import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DeporteServiceProvider {
  public iddeporte: string;
  public nombredeporte: string;
  headers: Headers;
  headersPost: Headers;
  options: RequestOptions;

  constructor(public http: Http) {
    console.log('Hello ProyectServiceProvider Provider');
  }

  getJsonData() {
    this.headersPost = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    let optionspost = new RequestOptions({
      headers: this.headersPost
    })

    return this.http.get('http://139.162.118.169:8080/proyectoAndroid/webresources/com.android.entidades.deporte',
      optionspost)
      .map(res => res.json());
  }

  getData() {
    this.headersPost = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    });

    let optionspost = new RequestOptions({
      headers: this.headersPost
    })

    return new Promise((resolve, reject) => {
      this.http.get('http://139.162.118.169:8080/proyectoAndroid/webresources/com.android.entidades.deporte', optionspost)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          resolve(err);
        });
    });
  }

  public saveDeportes(postParams) {

    this.headersPost = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    let optionspost = new RequestOptions({
      headers: this.headersPost
    })

    return new Promise((resolve, reject) => {
      this.http.post('http://139.162.118.169:8080/proyectoAndroid/webresources/com.android.entidades.deporte', {
        iddeporte: postParams.iddeporte,
        nombredeporte: postParams.nombredeporte
      }, optionspost)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          resolve(err);
        });

    });
  }

  public deleteDeportes(token, id) {
    this.headersPost = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + token
    });


    let optionspost = new RequestOptions({
      headers: this.headersPost
    });

    return new Promise((resolve, reject) => {
      this.http.delete('http://139.162.118.169:8080/proyectoAndroid/webresources/com.android.entidades.deporte/' + id, optionspost)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          resolve(err);
        })
    })
  }


  public updateDeporte(token, id, postParams) {

    let body = 'iddeporte=' + postParams.iddeporte +
      '&nombredeporte=' + postParams.nombredeporte;

    this.headersPost = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + token
    });

    let optionspost = new RequestOptions({
      headers: this.headersPost
    });

    return new Promise((resolve, reject) => {
      this.http.put('http://139.162.118.169:8080/proyectoAndroid/webresources/com.android.entidades.deporte' + id, body, optionspost)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          resolve(err);
        })
    });
  }
}





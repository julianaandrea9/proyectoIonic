import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DeporteServiceProvider {

  headers: Headers;
  headersPost: Headers;
  options: RequestOptions;

  constructor(public http: Http) {

  }

  getJsonData(){
    this.headersPost = new Headers({
   'Content-Type': 'application/x-www-form-urlencoded',
   'Access-Control-Allow-Origin' : '*'
  } );

  let optionspost = new RequestOptions({
   headers: this.headersPost
})

return this.http.get('https://139.162.118.169:8080/proyectoAndroid/webresources/com.android.entidades.deporte',
optionspost)
.map(res=> res.json()); 
 }

 public getDeporte(token) {
  this.headersPost = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + token
  });

  let optionspost = new RequestOptions({
    headers: this.headersPost
  });

  return new Promise((resolve, reject) => {
    this.http.get('https://139.162.118.169:8080/proyectoAndroid/webresources/com.android.entidades.deporte', optionspost)
      .subscribe(res => {
        resolve(res)
      }), (err) => {
        resolve(err)
      }
  })
}

public deleteDeporte(token, id) {
  this.headersPost = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + token
  });


  let optionspost = new RequestOptions({
    headers: this.headersPost
  });

  return new Promise((resolve, reject) => {
    this.http.delete('https://139.162.118.169:8080/proyectoAndroid/webresources/com.android.entidades.deporte'+ id, optionspost)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        resolve(err);
      })
  })
}

  public saveDeporte(token, postParams) {

    let body = {iddeporte: postParams.iddeporte,nombreequipo: postParams.nombreequipo};

    this.headersPost = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization':'Bearer '+ token
      
    });

    let optionspost = new RequestOptions({
      headers: this.headersPost
    })

    return new Promise((resolve, reject) => {
      this.http.post('https://139.162.118.169:8080/proyectoAndroid/webresources/com.android.entidades.deporte',
        body ,optionspost)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          resolve(err);
        });
    });
  }  
}

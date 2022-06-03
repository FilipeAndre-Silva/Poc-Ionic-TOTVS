import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  constructor(private http: HttpClient, private apiService: ApiService, public toastController: ToastController) { }
  url_order = environment.api_url_order;


  /* export enum KdsOrderStatus {
    __Queued = 0,
    __InPreparation = 1,
    __Ready = 2,
    __PickedUp = 3,
    __Delivered = 4,
    __Canceled = 5,
    __Finalized = 6,
    } */

  getsimplifiedcompanylist() {
    return this.http.get(`${this.url_order}/company/getsimplifiedcompanylist`);
  }



  getsimplifiedcompanylist2(): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    return this.http.get(
      `${this.url_order}/company/getsimplifiedcompanylist`,
      { headers: headers }
    ).pipe(

      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Estabelecimentos não encontrados.');
      })
    )
  }

  ordersbystatus(status): Observable<any> {
    /* const params = new HttpParams()
    .set('StatusList', 0)
    .set('StatusList', 1)
    .set('StatusList', 2); */

    const params = new HttpParams({
      fromString: status
    });

    return this.http.get(
      `${this.url_order}/kitchen/ordersbystatus`,
      { params }
    ).pipe()
  }

  getKdsGroups() {
    return this.http.get(`${this.url_order}/kitchen/kdsgroups`);
  }


  updateOrdersStatus(param): Observable<any> {
    var filter = {id: param.id, accountId: param.accountId, isSalesOrder: param.isSalesOrder, status: param.status }
    return this.http.put(`${this.url_order}/kitchen/updateordersstatus`, filter)
    .pipe()
    /* .pipe(
      map((data: any) => {
        return data;
      })
       ,catchError(error => {
        //console.log(error);
        return throwError(error);
        //return error;
      }) 
    ); */
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}



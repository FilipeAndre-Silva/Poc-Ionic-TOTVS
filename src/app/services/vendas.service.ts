import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import * as Rx from "rxjs/Rx";
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import * as signalR from '@microsoft/signalr';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  constructor(private http: HttpClient, private apiService: ApiService, public toastController: ToastController) {
     //this.createConnection();
    //this.registerOnServerEvents();
    // this.startConnection();

  }
  url_order = environment.api_url_order;
  loadingObserver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingRequestMap: Map<string, boolean> = new Map<string, boolean>();

  private _hubConnection: signalR.HubConnection;
  /* export enum KdsOrderStatus {
    __Queued = 0,
    __InPreparation = 1,
    __Ready = 2,
    __PickedUp = 3,
    __Delivered = 4,
    __Canceled = 5,
    __Finalized = 6,
    } */

  state = {};

  public returnInvoke: any;
  async ConnectToStock() {
   //;;this._hubConnection.invoke('ConnectToStock', symbol);
    let pos_user: any = await Storage.get({ key: 'pos.user' });
    pos_user = JSON.parse(pos_user.value);
    let param = "KDS_" + pos_user.id;
    console.log('param ', param);
    //const dataChange = 
    this._hubConnection.invoke('AddToGroupAsync', param)
    this.ordersbystatus('StatusList=0&StatusList=1&StatusList=2');   

  
  };
  
  
  private createConnection() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(environment.api_socket, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
  
  }
  
  startConnection(): void {

    this.createConnection();
    this._hubConnection
      .start()
      .then(async () => {
        console.log('Hub Connection started');
        var h = await this.ConnectToStock();
        console.log('h ', h );
      })
      .catch(() => {
        setTimeout(() => {
          this.startConnection();
        }, 5000);
      })
    }

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
    var filter = { id: param.id, accountId: param.accountId, isSalesOrder: param.isSalesOrder, status: param.status }
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

  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error('The request URL must be provided');
    }
    if (loading === true) {
      this.loadingRequestMap.set(url, loading);
      this.loadingObserver.next(true);
    } else if (loading === false && this.loadingRequestMap.has(url)) {
      this.loadingRequestMap.delete(url);
    }
    if (this.loadingRequestMap.size === 0) {
      this.loadingObserver.next(false);
    }
  }
}



import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  constructor(private http: HttpClient, private apiService: ApiService) { }
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

  ordersbystatus() {
    const params = new HttpParams()
    //.set('ExceptSalesOrders', true)
    //.set('LimitAmount', 10)
    .set('StatusList', 0) 
    .set('StatusList', 1)
    .set('StatusList', 2);
    
    return this.http.get(`${this.url_order}/kitchen/ordersbystatus`, {params});
  }  

} 



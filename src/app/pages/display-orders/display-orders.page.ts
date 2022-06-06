import { Component, OnInit } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { SwiperComponent } from "swiper/angular";
import { IonicSlides, LoadingController } from '@ionic/angular';
import { EventsParams, } from 'swiper/angular';
import SwiperCore, { Pagination, Swiper } from "swiper";
import { SwiperEvents } from 'swiper/types';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import * as signalR from '@microsoft/signalr';  
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-display-orders',
  templateUrl: './display-orders.page.html',
  styleUrls: ['./display-orders.page.scss'],
})
export class DisplayOrdersPage implements OnInit {

  constructor(private vendasService: VendasService, platform: Platform, private apiService:ApiService, private loadingController : LoadingController) {
    platform.ready().then(() => {
      this.heightScreen = platform.height() + 'px';
    });
  }

  heightScreen: any = 0;
  listsGeneral: any = [];
  listQueued: any = [];
  listInPreparation: any = [];
  listReady: any = [];
  activeIndex: number = 0;
  listGroups: any = [];
  showSwipes: boolean = false;
  displayType: string = "";
  statusSelected: any = [{ "id": "", "displayId": "", "displayDescription": "", "icon": "" }];

  showFilter: boolean = false;
  async ngOnInit() {
    SwiperCore.use([Pagination]);
    await this.vendasService.startConnection();
    
    this.getKdsGroups();
  }


  ionViewWillEnter() {
    this.ordersbystatus();
  }

  
  async getKdsGroups() {
    this.listGroups = [
      {
        "id": "00000000-0000-0000-0000-000000000000",
        "displayId": "00000000-0000-0000-0000-000000000000",
        "displayDescription": "Todos",
        "icon": "filter"
      },
      {
        "id": "7aa28158-9d7a-42e7-93f0-deabc9392574",
        "displayId": "7aa28158-9d7a-42e7-93f0-deabc9392574",
        "displayDescription": "Bebidas",
        "icon": "beer"
      },
      {
        "id": "7588d16b-4606-4cfc-ace5-e17d0f3008de",
        "displayId": "7588d16b-4606-4cfc-ace5-e17d0f3008de",
        "displayDescription": "Entrada",
        "icon": "leaf"
      },
      {
        "id": "db121a53-ccfe-4143-bacc-7254ae096022",
        "displayId": "db121a53-ccfe-4143-bacc-7254ae096022",
        "displayDescription": "Prato Principal",
        "icon": "pizza"
      },
      {
        "id": "61efef19-004f-4703-a3c6-dd35645903ca",
        "displayId": "61efef19-004f-4703-a3c6-dd35645903ca",
        "displayDescription": "Sobremesa",
        "icon": "ice-cream"
      },
      {
        "id": "d03114e6-c563-41a8-8442-ac8b87b3c077",
        "displayId": "d03114e6-c563-41a8-8442-ac8b87b3c077",
        "displayDescription": "Vinho",
        "icon": "wine"
      }
    ]
    this.displayType = this.listGroups[0].id;
    this.statusSelected = this.listGroups[0];
    this.showFilter = true;
  }


  async ordersbystatus() {
    var filtro = 'StatusList=0&StatusList=1&StatusList=2';
    (await this.vendasService.ordersbystatus(filtro)).subscribe((result: any) => {
      this.listsGeneral = result;
      if(result.length > 0){
        
        this.formatOrdersByStatus(this.listsGeneral, this.displayType);
      }else{
        this.resetLists();
      }

    }, error => {
      console.log(error)
    });

  }



  resetLists(){
    this.listsGeneral = {}; 
    this.listQueued = {};
    this.listInPreparation = {};
    this.listReady = {};
  }

  async formatOrdersByStatus(list, type?) {
    const loading = await this.loadingController.create();
    await loading.present();
    
    this.displayType = type ? type : this.displayType;
    var vm = this;
    this.statusSelected = this.listGroups.filter(function (e) {
      return e.displayId == vm.displayType;
    });

    this.listQueued = await this.filterItems(list, this.displayType, 0);
    this.listInPreparation = await this.filterItems(list, this.displayType, 1);
    this.listReady = await this.filterItems(list, this.displayType, 2);
    this.showSwipes = true

    await loading.dismiss();
  }

  filterItems(array, displayType, status) {
    return array.filter(function (e) {
      return e.displayId == displayType && e.kdsOrderStatus == status;
    });
  }


  updateStatus(item, status) {
    let paramFilter  = {
      "accountId": item.accountId,
      "id": item.kdsSalesOrderId, //id
      "isSalesOrder": true,
      "status": status
    }
    
    this.vendasService.updateOrdersStatus(paramFilter).subscribe(async (res: any) => {
      await this.ordersbystatus();

    }, error => {
      this.vendasService.presentToast('Erro ao atualiza status')
    });

  }

  mytitleDinamic: string = 'Na Fila';
  onSwiper([swiper]) {
    console.log('swiper ', swiper);
  }

  onSlideChange(eventParams: Parameters<SwiperEvents['activeIndexChange']>) {
    const [swiper] = eventParams;
    this.activeIndex = swiper.activeIndex;
    switch (this.activeIndex) {
      case 1:
        document.getElementById("titleDinamic").innerHTML = "Em Preparo";
        break;
      case 2:
        document.getElementById("titleDinamic").innerHTML = "Pronto";
        break;
      case 0:
        document.getElementById("titleDinamic").innerHTML = "Na Fila";
        break;
      default:
        document.getElementById("titleDinamic").innerHTML = "Display";
        break;
    }

  }
  
}

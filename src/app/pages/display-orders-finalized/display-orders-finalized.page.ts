import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { VendasService } from 'src/app/services/vendas.service';
import SwiperCore, { Pagination, Swiper } from "swiper";
import { SwiperEvents } from 'swiper/types';

@Component({
  selector: 'app-display-orders-finalized',
  templateUrl: './display-orders-finalized.page.html',
  styleUrls: ['./display-orders-finalized.page.scss'],
})
export class DisplayOrdersFinalizedPage implements OnInit {

  constructor(private vendasService: VendasService, public loadingController: LoadingController) { }

  listsGeneral: any = [];
  listReady: any = [];
  listPickedUp: any = [];
  activeIndex: number = 2;
  showSwipes: boolean = false;
  listGroups: any = [];
  statusSelected: any = [{ "id": "", "displayId": "", "displayDescription": "", "icon": "" }];
  showFilter: boolean = false;

  ngOnInit() {
    SwiperCore.use([Pagination]);
    //this.vendasService.startConnection();
    this.getKdsGroups();
  }

  ionViewWillEnter() {
    this.ordersbystatus();
  }

  displayType = "00000000-0000-0000-0000-000000000000";
  ordersbystatus() {
    var filtro = 'LimitAmount=10&StatusList=2&StatusList=3';
    this.vendasService.ordersbystatus(filtro).subscribe(async (res: any) => {
      this.listsGeneral = res;
      this.formatOrdersByStatus(this.listsGeneral, this.displayType);
    });
  }


  async formatOrdersByStatus(list, type?) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.displayType = type ? type : this.displayType;
    var vm = this;
    this.statusSelected = this.listGroups.filter(function (e) {
      return e.displayId == vm.displayType;
    });


    this.listReady = await this.filterItems(list, this.displayType, 2);
    this.listPickedUp = await this.filterItems(list, this.displayType, 3);
    this.showSwipes = true

    await loading.dismiss();

  }

  filterItems(array, displayType, status) {
    return array.filter(function (e) {
      return e.displayId == displayType && e.kdsOrderStatus == status;
    });
  }

  updateStatus(item, status) {
    let paramFilter = {
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

    //this.displayType = "00000000-0000-0000-0000-000000000000";
    this.displayType = this.listGroups[0].id;
    this.statusSelected = this.listGroups[0];
    this.showFilter = true;
  }


  mytitleDinamic: string = 'Pronto';
  onSwiper([swiper]) {
    console.log('swiper ', swiper);
  }

  onSlideChange(eventParams: Parameters<SwiperEvents['activeIndexChange']>) {
    const [swiper] = eventParams;
    this.activeIndex = swiper.activeIndex;
    switch (this.activeIndex) {
      case 1:
        document.getElementById("titleDinamic2").innerHTML = "Entregue";
        break;
      case 0:
        document.getElementById("titleDinamic2").innerHTML = "Pronto";
        break;
    }
  }
}

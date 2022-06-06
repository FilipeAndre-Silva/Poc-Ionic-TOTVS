import { Component, OnInit } from '@angular/core';
import { VendasService } from 'src/app/services/vendas.service';
import SwiperCore, { Pagination, Swiper } from "swiper";
import { SwiperEvents } from 'swiper/types';

@Component({
  selector: 'app-display-orders-finalized',
  templateUrl: './display-orders-finalized.page.html',
  styleUrls: ['./display-orders-finalized.page.scss'],
})
export class DisplayOrdersFinalizedPage implements OnInit {

  constructor(private vendasService: VendasService) { }

  listsGeneral: any = [];
  listReady: any = [];
  listPickedUp: any = [];
  activeIndex : number = 2;
  showSwipes : boolean = false;


  ngOnInit() {
    SwiperCore.use([Pagination]);
    this.ordersbystatus();
  }
  displayType = "00000000-0000-0000-0000-000000000000";
  ordersbystatus() {
    var filtro = 'LimitAmount=10&StatusList=2&StatusList=3';
    //var filtro = 'StatusList=2&StatusList=3';
    this.vendasService.ordersbystatus(filtro).subscribe(async (res: any) => {
      this.listsGeneral = res;
      console.log(' res ordersbystatus ', res);
      this.formatOrdersByStatus(this.listsGeneral, this.displayType);
    });
  }

  
  async formatOrdersByStatus(list, type?) {
    this.displayType = type ? type : this.displayType;

    this.listReady = await this.filterItems(list, this.displayType, 2);
    this.listPickedUp = await this.filterItems(list, this.displayType, 3);
    console.log('this.listReady ', this.listReady);
    console.log('this.listPickedUp ', this.listPickedUp);
    this.showSwipes = true

  }

  filterItems(array, displayType, status) {
    return array.filter(function(e) {
      return e.displayId == displayType && e.kdsOrderStatus == status; 
    });
  }

  updateStatus(item, status) {
    console.log('item ', item);

    let paramFilter  = {
      "accountId": item.accountId,
      "id": item.kdsSalesOrderId, //id
      "isSalesOrder": true,
      "status": status
    }
    
    this.vendasService.updateOrdersStatus(paramFilter).subscribe(async (res: any) => {
      console.log('updateordersstatus ', res)

      await this.ordersbystatus();

    }, error => {
      this.vendasService.presentToast('Erro ao atualiza status')
    });

  }
  

  mytitleDinamic: string = 'Pronto';
  onSwiper([swiper]) {
    console.log('swiper ', swiper);
  }

  onSlideChange( eventParams: Parameters<SwiperEvents['activeIndexChange']> ) {
    const [swiper] = eventParams;
    this.activeIndex = swiper.activeIndex;
    console.log('this.activeIndex ', this.activeIndex);
    switch (this.activeIndex) {
      case 1:
          document.getElementById("titleDinamic").innerHTML = "Entregue";
        break;
      case 0:
          document.getElementById("titleDinamic").innerHTML = "Pronto";
          break;
    }


  }



}

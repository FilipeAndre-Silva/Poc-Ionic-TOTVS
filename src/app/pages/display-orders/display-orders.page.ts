import { Component, OnInit } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { SwiperComponent } from "swiper/angular";
import { IonicSlides } from '@ionic/angular';
import { EventsParams, } from 'swiper/angular';
import SwiperCore, { Pagination, Swiper } from "swiper";
import { SwiperEvents } from 'swiper/types';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-display-orders',
  templateUrl: './display-orders.page.html',
  styleUrls: ['./display-orders.page.scss'],
})
export class DisplayOrdersPage implements OnInit {

  constructor(private vendasService: VendasService) { }

  listsGeneral: any = [];
  listQueued: any = [];
  listInPreparation: any = [];
  listReady: any = [];
  activeIndex : number = 0;

  ngOnInit() {
    this.ordersbystatus();
  }

  displayType = "Todos";
  ordersbystatus() {
    this.vendasService.ordersbystatus().subscribe(async (res: any) => {
      this.listsGeneral = res;
      console.log(' res ordersbystatus ', res);
      //this.listOrders.Todos.listQueued = res.filter(this.setFilterTodosQueued);
      this.formatOrdersByStatus(this.listsGeneral, this.displayType);
    });
  }

  async formatOrdersByStatus(list, type?) {
    this.displayType = type ? type : this.displayType;

   // this.listQueued = this.filterItems(list, "Todos", 0);
    this.listQueued = await this.filterItems(list, this.displayType, 0);
    this.listInPreparation = await this.filterItems(list, this.displayType, 1);
    this.listReady = await this.filterItems(list, this.displayType, 2);
    console.log('this.listQueued ', this.listQueued);
    console.log('this.listInPreparation ', this.listInPreparation);
    console.log('this.listReady ', this.listReady);

  }

  filterItems(array, displayType, status) {
    return array.filter(function(e) {
      return e.displayDescription == displayType && e.kdsOrderStatus == status; 
    });
  }
  

  mytitleDinamic: string = 'Na Fila';
  onSwiper([swiper]) {
    console.log('swiper ', swiper);
  }

  onSlideChange( eventParams: Parameters<SwiperEvents['activeIndexChange']> ) {
    const [swiper] = eventParams;
    this.activeIndex = swiper.activeIndex;
    console.log('this.activeIndex ', this.activeIndex);
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

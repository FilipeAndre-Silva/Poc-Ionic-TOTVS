import { Component, OnInit } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { SwiperComponent } from "swiper/angular";
import { IonicSlides } from '@ionic/angular';
import { EventsParams, } from 'swiper/angular';
import SwiperCore, { Pagination, Swiper } from "swiper";
import { SwiperEvents } from 'swiper/types';


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
  listGroups : any = [];
  showSwipes : boolean = false;

  ngOnInit() {
    SwiperCore.use([Pagination]);
    this.ordersbystatus();
    this.getKdsGroups();

  }
  

  getKdsGroups() {
    /* this.vendasService.getKdsGroups().subscribe(async (res: any) => {
      this.listGroups = res;
       res.forEach(element => {

      });
      console.log(' res listGroups ', this.listGroups);
    }); */

    
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
    console.log(' res listGroups ', this.listGroups);

  }


  displayType = "00000000-0000-0000-0000-000000000000";
  ordersbystatus() {
    var filtro = 'statusList=0&statusList=1&statusList=2';
    this.vendasService.ordersbystatus(filtro).subscribe(async (res: any) => {
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
    this.showSwipes = true

  }

  filterItems(array, displayType, status) {
    return array.filter(function(e) {
      return e.displayId == displayType && e.kdsOrderStatus == status; 
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

import { Component, OnInit } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { SwiperComponent } from "swiper/angular";
import { IonicSlides } from '@ionic/angular';
import { EventsParams,  } from 'swiper/angular';
import SwiperCore, { Pagination } from "swiper";

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-display-orders',
  templateUrl: './display-orders.page.html',
  styleUrls: ['./display-orders.page.scss'],
})
export class DisplayOrdersPage implements OnInit {

  constructor(private vendasService: VendasService) { }

  listsGeneral = [];

  ngOnInit() {
    this.ordersbystatus();
  }

  ordersbystatus(){
    this.vendasService.ordersbystatus().subscribe((res: any) => {
      //this.listCompanies = res;
      console.log(' res ordersbystatus ',   res );
    });
    
  }

 onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}

import { Component, OnInit } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {
  listCompanies = [];

  constructor(
      private vendasService: VendasService,
      private apiService: ApiService,
      private router: Router) { }

  async ngOnInit() { 
    await this.getLisCompanies();
  
  }

  async getLisCompanies(){
    this.vendasService.getsimplifiedcompanylist().subscribe((res: any) => {
      this.listCompanies = res;
      console.log(' this.listCompanies ',   this.listCompanies );
    });
  }

  selectCompany(idCompany){
    console.log('idCompany => ', idCompany);
     this.apiService.changecompany(idCompany).subscribe((res: any) => {
      //this.listCompanies = res;
      console.log(' res selectCompany ',   res );
      this.router.navigate(['tabs'], { replaceUrl: true });
    }); 

  }

  logout() {
    this.apiService.logout();
  } 
}
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
    //await this.getLisCompanies();
    await this.getLisCompanies2();
  }

  async getLisCompanies(){
    this.vendasService.getsimplifiedcompanylist().subscribe((res: any) => {
      this.listCompanies = res;
      console.log(' this.listCompanies ',   this.listCompanies );
    });
  }

  async getLisCompanies2() {
    this.vendasService
    .getsimplifiedcompanylist2()
    .subscribe((data: any ) => {
      console.log(data);
      this.listCompanies = data;
      var vm = this;
      this.listCompanies.forEach(item => {
        item.initial = vm.separateString(item.companyName);
      });
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

  separateString(item) {
    //item = item.replace(/\s(de|da|dos|das)\s/g, ' '); // Remove os de,da, dos,das.
    var iniciais = item.match(/\b(\w)/gi); // Iniciais de cada parte do nome.
    var final = "";
    iniciais.forEach(e => {
      console.log(e);
      final+= e;
    });
    return final;
  }

  logout() {
    this.apiService.logout();
  } 
}
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  public listaUsuarios: any = [];
  public pagina = 1;
  public totalPaginas = 1;

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.buscarUsuarios(1);
  }

  public buscarUsuarios(pagina: number){
    if(pagina <= 0){
      pagina = 1;
    }

    this.pagina = pagina;
    this.userService.buscarTodos(pagina).subscribe(dados => {
      this.listaUsuarios = dados['data'];
      this.totalPaginas = dados['total_pages'];
      console.log("Lista", this.listaUsuarios);
    });
  }

}

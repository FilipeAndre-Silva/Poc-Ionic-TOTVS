import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listaUsuarios: any = [];
  public pagina = 1;
  public totalPaginas = 1;

  constructor(private userService: UserService) {}
  ionViewWillEnter()
  {
   this.buscarUsuarios();
  }

  public buscarUsuarios(){
    this.userService.buscarTodos().subscribe(dados => {
      this.listaUsuarios = dados;
      console.log("Lista", this.listaUsuarios);
    });
  }
}

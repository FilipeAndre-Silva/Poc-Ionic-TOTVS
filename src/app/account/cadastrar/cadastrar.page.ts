import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  public usuario: Usuario = {}
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public async salvar(){
    this.userService.cadastrar(this.usuario).subscribe(retorno =>{
      this.usuario = retorno;
    })
  }
}

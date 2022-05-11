import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  public usuario: Usuario = {}
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  public async salvar(nome:string, sobrenome:string, email:string, telefone:string, cpf:string){
    this.usuario.nome = nome;
    this.usuario.sobrenome = sobrenome;
    this.usuario.email = email;
    this.usuario.telefone = telefone;
    this.usuario.cpf = cpf;

    this.userService.cadastrar(this.usuario).subscribe(retorno =>{
      this.usuario = retorno;
      this.router.navigate([ '/home' ]);
    })
  }
}

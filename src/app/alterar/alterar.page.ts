import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.page.html',
  styleUrls: ['./alterar.page.scss'],
})
export class AlterarPage implements OnInit {

  public usuario:Usuario = {};
  public id: number;

  constructor(private route:ActivatedRoute,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.buscarId(this.id).subscribe(dados => {
      this.usuario.nome = dados['nome'];
      this.usuario.sobrenome = dados['sobrenome'];
      this.usuario.email = dados['email'];
      this.usuario.telefone = dados['telefone'];
      this.usuario.cpf = dados['cpf'];
      this.usuario.id = dados['id'];
    });
  }

  public salvar(nome:string, sobrenome:string, email:string, telefone:string, cpf:string){
    this.usuario.nome = nome;
    this.usuario.sobrenome = sobrenome;
    this.usuario.email = email;
    this.usuario.telefone = telefone;
    this.usuario.cpf = cpf;
    this.userService.aletrar(this.usuario).subscribe(retorno => {
      this.usuario = retorno;
    this.router.navigate([ '/home' ]);
    })
  }
}

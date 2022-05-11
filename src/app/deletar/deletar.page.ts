import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deletar',
  templateUrl: './deletar.page.html',
  styleUrls: ['./deletar.page.scss'],
})
export class DeletarPage implements OnInit {

  public usuario:Usuario = {};
  public id: number;
  
  constructor(private route:ActivatedRoute,
    private userService: UserService,
    private router: Router) { }

    ngOnInit() {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.userService.buscarId(this.id).subscribe(dados => {
        this.usuario.id = dados['id'];
        this.usuario.nome = dados['nome'];
        this.usuario.sobrenome = dados['sobrenome'];
      });
    }

  public deletar(id: number){
    this.userService.deletar(id).subscribe();
    this.router.navigate([ '/home' ]);
  }
}

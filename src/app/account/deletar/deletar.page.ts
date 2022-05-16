import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deletar',
  templateUrl: './deletar.page.html',
  styleUrls: ['./deletar.page.scss'],
})
export class DeletarPage implements OnInit {

  public user: any = {};
  public usuarioIdDelete: number;
  public id: number;
  
  constructor(private route:ActivatedRoute,
    private userService: UserService,
    private router: Router) { }

    ngOnInit() {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.userService.buscarId(this.id).subscribe(dados => {
        this.user = dados['data'];
        console.log(this.user);
      });
    }

  public deletar(){
    this.userService.deletar(this.user).subscribe(retorno =>{
      this.usuarioIdDelete = this.id;
    })
  }
}

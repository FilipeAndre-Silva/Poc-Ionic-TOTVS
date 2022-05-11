import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  public buscarTodos(){
    return this.http.get(`${this.url}`);
  }

  public buscarId(id: number){
    return this.http.get(`${this.url}/${id}`);
  }

  public cadastrar(usuario: Usuario){
    return this.http.post(this.url, usuario);
  }

  public aletrar(usuario: Usuario){
    return this.http.put(`${this.url}/${usuario.id}`, usuario);
  }

  public deletar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}

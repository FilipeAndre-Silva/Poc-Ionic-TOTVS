import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://reqres.in/api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public buscarTodos(pagina: number){
    if(pagina <= 0){
      pagina = 1;
    }

    return this.http.get(`${this.url}?page=${pagina}`);
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

  public deletar(usuario: Usuario){
    return this.http.delete(`${this.url}/${usuario.id}`);
  }
}

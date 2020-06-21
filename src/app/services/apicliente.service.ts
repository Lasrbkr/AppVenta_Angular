import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { Clientes } from '../models/clientes';

const httpOption = 
{
  headers: new HttpHeaders({
      'Contend-Type' : 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {
  url: string = "https://localhost:44324/api/cliente/";
  
  constructor(private _http: HttpClient) 
  {
    
  }

  getCliente(): Observable<Response>
  {
    return this._http.get<Response>(this.url);
  }

  addCliente(cliente: Clientes): Observable<Response>
  {
    return this._http.post<Response>(this.url, cliente, httpOption);
  }

  editCliente(cliente: Clientes): Observable<Response>
  {
    return this._http.put<Response>(this.url, cliente, httpOption);
  }

  deleteCliente(id: string): Observable<Response>
  {
    return this._http.delete<Response>(`${this.url}${id}`);
  }
}

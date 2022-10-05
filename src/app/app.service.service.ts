import { AgenteDTO } from './dto/agenteDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private apiURL = 'http://localhost:8080/agentes';
  
  constructor(private http: HttpClient) { }

  public post(data : AgenteDTO) {
    let headers = new HttpHeaders({
      "Content-Type":  "application/json",
      "Accept": "application/json"
    });
    
    let httpOptions = {
      headers: headers
    };    
    return this.http.post(`${ this.apiURL }/agente`, data, httpOptions);
  }

}

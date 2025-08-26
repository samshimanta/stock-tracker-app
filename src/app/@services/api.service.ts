import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl = 'https://www.alphavantage.co/';

     searchStock(queryString:string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}query?function=SYMBOL_SEARCH&keywords=${queryString}&apikey=D84MXDULQRA0JWGK`);
      }
}

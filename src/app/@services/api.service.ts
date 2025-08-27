import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // private apiUrl = 'https://www.alphavantage.co/';
  private apiUrl ='https://alpha-vantage.p.rapidapi.com/';

  private headers = new HttpHeaders({
      'x-rapidapi-key': '2622e92ca7msh0022fd3e24b3241p1a661ajsn1ac02697eb38',
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
    });

     searchStock(queryString:string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}query?datatype=json&keywords=${queryString}&function=SYMBOL_SEARCH`, { headers: this.headers });
      }

      getStockDetails(symbol:string): Observable<any> {        
        return this.http.get<any>(`${this.apiUrl}query?function=GLOBAL_QUOTE&symbol=${symbol}&datatype=json`, { headers: this.headers });

      }


      getMonthlyTimeSeries(symbol:string): Observable<any> {        
        return this.http.get<any>(`${this.apiUrl}query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&datatype=json`, { headers: this.headers });

      }
    
      getWeeklyTimeSeries(symbol:string): Observable<any> {        
return this.http.get<any>(`${this.apiUrl}query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&datatype=json`, { headers: this.headers });
      }

      getDailyTimeSeries(symbol:string): Observable<any> {        
return this.http.get<any>(`${this.apiUrl}query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&datatype=json`, { headers: this.headers });      }
}

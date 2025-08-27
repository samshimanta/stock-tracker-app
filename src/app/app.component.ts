import { Component, OnInit } from '@angular/core';
import { ApiService } from './@services/api.service';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stock-tracker-app';
  searchSubject = new Subject<string>();

  stockDetails: any;
  stockName: string = '';

  mothlyTimeSeries: any;

  suggestions!: any[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

  this.searchSubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query => {
      if (!query) return of({ bestMatches: [] });
      return this.apiService.searchStock(query);
    })
  ).subscribe(res => {
    console.log(res);
    this.suggestions = res.bestMatches;
  });
  }



  // search($event: any): void {
  //   console.log('Search query:', $event.target.value);

  //   this.apiService.searchStock($event.target.value).pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //          switchMap((query) => {
  //         if (!query) return of([]); // Avoid API call for empty input
  //         return this.stockService.searchStocks(query);
  //       })
  //   ).
    
  //   subscribe(
  //     res => {
  //       console.log(res);
  //       this.suggestions = res.bestMatches;
  //     }
  //   )
  // }

  search($event: any): void {
  const query = $event.target.value;
  this.searchSubject.next(query);
}
  selectSuggestion(suggestion:any){
    console.log('Selected suggestion:', suggestion);
    console.log(suggestion['1. symbol']);
    this.stockName = suggestion['2. name'];
    this.suggestions.length = 0; // Clear suggestions after selection
    
    this.apiService.getStockDetails(suggestion['1. symbol']).subscribe(
    { next: (res) => {
        console.log('Stock details:', this.stockDetails = res);
      },
      error: (err) => {
        console.error('Error fetching stock details:', err);},
      complete: () => {
        console.log('Completed fetching stock details');
        this.getMonthlyTimeSeries(suggestion['1. symbol']);
       }
      })
    
  }

  getMonthlyTimeSeries(symbol:string){
    this.apiService.getMonthlyTimeSeries(symbol).subscribe(
      { next: (res) => {
          console.log('Monthly Time Series:', res);
          this.mothlyTimeSeries = res;
        },
        error: (err) => {
          console.error('Error fetching monthly time series:', err);},
        complete: () => {
          console.log('Completed fetching monthly time series');
         }
        })
  }
}

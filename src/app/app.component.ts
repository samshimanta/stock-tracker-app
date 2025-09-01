import { Component, OnInit } from '@angular/core';
import { ApiService } from './@services/api.service';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public chart!: Chart;
  
  title = 'stock-tracker-app';
  searchSubject = new Subject<string>();

  stockDetails: any;
  stockName: string = '';

  mothlyMetaData: any;
  mothlyTimeSeries: any;
  weeklyMetaData: any;
  weeklyTimeSeries: any;
  dailyMetaData: any;
  dailyTimeSeries: any;

  suggestions!: any[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

  this.chart = new Chart("canvas", {
      type: "bar",
      // data: {
      //   labels: labels,
      //   datasets: [
      //     {
      //       label: "Open",
      //       data: openArray,
      //       borderWidth: 1,
      //       backgroundColor: "#407ab3"
      //     },
      //     {
      //       label: "High",
      //       data: highArray,
      //       borderWidth: 1,
      //       backgroundColor: "#42b3a6"
      //     },
      //     {
      //       label: "Low",
      //       data: lowArray,
      //       borderWidth: 1,
      //       backgroundColor: "#e2a03f"
      //     },
      //     {
      //       label: "Close",
      //       data: closeArray,
      //       borderWidth: 1,
      //       backgroundColor: "#e24f3f"
      //     }




      //   ],
      // }
       data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      }
      });

  // this.searchSubject.pipe(
  //   debounceTime(300),
  //   distinctUntilChanged(),
  //   switchMap(query => {
  //     if (!query) return of({ bestMatches: [] });
  //     return this.apiService.searchStock(query);
  //   })
  // ).subscribe(res => {
  //   console.log(res);
  //   this.suggestions = res.bestMatches;
  // });
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
        this.getWeeklyTimeSeries(suggestion['1. symbol']);
        this.getDailyTimeSeries(suggestion['1. symbol']);
       }
      })
    
  }

  getMonthlyTimeSeries(symbol:string){
    this.apiService.getMonthlyTimeSeries(symbol).subscribe(
      { next: (res) => {
          console.log('Monthly Time Series:', res);
          this.mothlyTimeSeries = res?.['Monthly Time Series'];
          this.mothlyMetaData = res?.['Meta Data'];
          console.log(this.mothlyMetaData);
        },
        error: (err) => {
          console.error('Error fetching monthly time series:', err);},
        complete: () => {
          console.log('Completed fetching monthly time series');
         }
        })
  }

  getWeeklyTimeSeries(symbol:string){
    this.apiService.getWeeklyTimeSeries(symbol).subscribe(
      { next: (res) => {
          console.log('Weekly Time Series:', res);
          this.weeklyTimeSeries = res?.['Weekly Time Series'];
          this.weeklyMetaData = res?.['Meta Data'];
          console.log(this.weeklyMetaData); 
        },
        error: (err) => {
          console.error('Error fetching weekly time series:', err);},
        complete: () => {
          console.log('Completed fetching weekly time series');
         }
        })
  }

  getDailyTimeSeries(symbol:string){
    this.apiService.getDailyTimeSeries(symbol).subscribe(
      { next: (res) => {
          console.log('Daily Time Series:', res);
          this.dailyTimeSeries = res?.['Time Series (Daily)'];
          this.dailyMetaData = res?.['Meta Data'];
          console.log(this.dailyMetaData);
        },
        error: (err) => {
          console.error('Error fetching daily time series:', err);},
        complete: () => {
          console.log('Completed fetching daily time series');
         }
        })
  }
}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from "chart.js/auto";
@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit , OnChanges {
 

  mothlyData: any;

  @Input() mothlyTimeSeries:any;
  @Input() canvasId!: string;
  @Input() metaData!: any;


 public chart!: Chart;
  ngOnInit() {
    
  }

   ngOnChanges(changes: SimpleChanges): void {
        this.mothlyData = changes['mothlyTimeSeries'].currentValue;

    const lastTenEntries = Object.entries(this.mothlyData)
  .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()) // Sort by date descending
  .slice(0, 10) // Get last 10
  .reduce((acc: { [key: string]: any }, [date, value]) => {
    acc[date] = value;
    return acc;
  }, {});
  this.makeChart(lastTenEntries);
  
  }

  makeChart(apiData:any) {
const labels = Object.keys(apiData);
const dataset=Object.values(apiData);
const openArray: any[] = [];
const highArray: any[] = [];
const lowArray: any[] = [];
const closeArray: any[] = [];
const volumeArray: any[] = [];
  
dataset.map((data:any)=>{
openArray.push(data['1. open'])
highArray.push(data['2. high'])
lowArray.push(data['3. low'])
closeArray.push(data['4. close'])
volumeArray.push(data['5. volume'])
  });

 if (this.chart) {
    this.chart.destroy();
  }
this.chart = new Chart(this.canvasId, {
  type: "bar",
      data: {
        labels: labels,
        datasets:[
          {
            label: "Open",
            data: openArray,
            borderWidth: 1,
            backgroundColor: "#407ab3"
          },
          {
            label: "High",
            data: highArray,
            borderWidth: 1,
            backgroundColor: "#42b3a6"
          },
          {
            label: "Low",
            data: lowArray,
            borderWidth: 1,
            backgroundColor: "#e2a03f"
          },
          {
            label: "Close",
            data: closeArray,
            borderWidth: 1,
            backgroundColor: "#e24f3f"
          }
          
        
          
         
        ],
      }
});

  }
}

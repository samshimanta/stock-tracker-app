import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from "chart.js/auto";
@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit, OnChanges, AfterViewInit {
  ngAfterViewInit(): void {
//             const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
// if (!canvas) {
//   console.error('Canvas element not found:', this.canvasId);
//   return;
// }
      // this.chart = new Chart("canvasId", {
      // type: "bar",
      //  data: {
      //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      //   datasets: [
      //     {
      //       label: "# of Votes",
      //       data: [12, 19, 3, 5, 2, 3],
      //       backgroundColor: [
      //         "rgba(255, 99, 132, 0.2)",
      //         "rgba(54, 162, 235, 0.2)",
      //         "rgba(255, 206, 86, 0.2)",
      //         "rgba(75, 192, 192, 0.2)",
      //         "rgba(153, 102, 255, 0.2)",
      //         "rgba(255, 159, 64, 0.2)"
      //       ],
      //       borderColor: [
      //         "rgba(255, 99, 132, 1)",
      //         "rgba(54, 162, 235, 1)",
      //         "rgba(255, 206, 86, 1)",
      //         "rgba(75, 192, 192, 1)",
      //         "rgba(153, 102, 255, 1)",
      //         "rgba(255, 159, 64, 1)"
      //       ],
      //       borderWidth: 1
      //     }
      //   ]
      // }
      // });
  }


  mothlyData: any;

  @Input() mothlyTimeSeries: any;
  @Input() canvasId!: string;
  @Input() metaData!: any;


  public chart!: Chart;
  constructor(private elementRef: ElementRef) { }
  ngOnInit() {


  }

  ngOnChanges(changes: SimpleChanges): void {
//             const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
// if (!canvas) {
//   console.error('Canvas element not found:', this.canvasId);
//   return;
// }
let htmlRef = this.elementRef.nativeElement.querySelector(`#canvasId`);
    // this.chart = new Chart(htmlRef, {
    //   type: "bar",
    //    data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(255, 159, 64, 0.2)"
    //         ],
    //         borderColor: [
    //           "rgba(255, 99, 132, 1)",
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255, 206, 86, 1)",
    //           "rgba(75, 192, 192, 1)",
    //           "rgba(153, 102, 255, 1)",
    //           "rgba(255, 159, 64, 1)"
    //         ],
    //         borderWidth: 1
    //       }
    //     ]
    //   }
    //   });

    this.mothlyData = changes['mothlyTimeSeries'].currentValue;

    if (this.mothlyData) {
      const lastTenEntries = Object.entries(this.mothlyData)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()) // Sort by date descending
        .slice(0, 10) // Get last 10 entries
        .reduce((acc: { [key: string]: any }, [date, value]) => {
          acc[date] = value;
          return acc;
        }, {});
        console.log(lastTenEntries);
        
        
      this.makeChart(lastTenEntries);
    }



  }

  makeChart(apiData: any) {

    const labels = Object.keys(apiData);
    const dataset = Object.values(apiData);
    const openArray: any[] = [];
    const highArray: any[] = [];
    const lowArray: any[] = [];
    const closeArray: any[] = [];
    const volumeArray: any[] = [];
console.log(dataset);
console.log(labels);


    dataset.map((data: any) => {
      openArray.push(data['1. open'])
      highArray.push(data['2. high'])
      lowArray.push(data['3. low'])
      closeArray.push(data['4. close'])
      volumeArray.push(data['5. volume'])
    });

//     const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
// if (!canvas) {
//   console.error('Canvas element not found:', this.canvasId);
//   return;
// }

    if (this.chart) {
      this.chart.destroy();
    }
    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvasId`);
    this.chart = new Chart(htmlRef, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
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
      //  data: {
      //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      //   datasets: [
      //     {
      //       label: "# of Votes",
      //       data: [12, 19, 3, 5, 2, 3],
      //       backgroundColor: [
      //         "rgba(255, 99, 132, 0.2)",
      //         "rgba(54, 162, 235, 0.2)",
      //         "rgba(255, 206, 86, 0.2)",
      //         "rgba(75, 192, 192, 0.2)",
      //         "rgba(153, 102, 255, 0.2)",
      //         "rgba(255, 159, 64, 0.2)"
      //       ],
      //       borderColor: [
      //         "rgba(255, 99, 132, 1)",
      //         "rgba(54, 162, 235, 1)",
      //         "rgba(255, 206, 86, 1)",
      //         "rgba(75, 192, 192, 1)",
      //         "rgba(153, 102, 255, 1)",
      //         "rgba(255, 159, 64, 1)"
      //       ],
      //       borderWidth: 1
      //     }
      //   ]
      // }
      });

  }
}

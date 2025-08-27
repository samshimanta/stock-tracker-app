import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StockQuote } from 'src/app/@interfaces/stock-qoute.interface';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements  OnChanges {
@Input() stockDetails:any;
@Input() stockName!:string;

data: any;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['stockDetails'].currentValue);
    console.log(changes['stockName'].currentValue);
    
    
  }


}

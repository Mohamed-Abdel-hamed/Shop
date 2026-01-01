import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Iorderinfo } from '../../../models/dashboard/iorderinfo';
import {   ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive
} from 'ng-apexcharts';
import { map } from 'rxjs';
import { CategoryService } from '../../../services/category.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
};
@Component({
  selector: 'app-dashboard',
  imports: [
  NgApexchartsModule
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
chartOptions: Partial<ChartOptions> = {
  series: [],
  chart: {
    type: 'donut'
  },
  labels: []
};

  orderInfo:Iorderinfo|null=null;
  labels:string[]=[];
  series:number[]=[];
  constructor(private orderService: OrderService,private categoryService:CategoryService) {

}
  ngOnInit(): void {

this.categoryService.getCategoryCount()
.subscribe({
  next:(res)=>{
    this.labels=res.map(i => i.label);
    this.series=res.map(i =>Number(i.value));
     this.chartOptions = {
      series:this.series,
      chart: {
        type: "donut"
      },
      labels: this.labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }
  });

    //////////////////////////////////////////////
    this.orderService.getOrdersInfo().subscribe({
      next: (res) => {
        this.orderInfo = res;
      }
    });
  }
}

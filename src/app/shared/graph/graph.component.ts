// import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import {ChartComponent, NgApexchartsModule} from "ng-apexcharts";
// import {
//   ApexNonAxisChartSeries,
//   ApexResponsive,
//   ApexChart,
//   ApexFill,
//   ApexDataLabels,
//   ApexLegend
// } from "ng-apexcharts";
//
// export type ChartOptions = {
//   series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   responsive: ApexResponsive[];
//   labels: any;
//   fill: ApexFill;
//   legend: ApexLegend;
//   dataLabels: ApexDataLabels;
// };
// @Component({
//   selector: 'app-graph',
//   standalone: true,
//   imports: [
//     NgApexchartsModule
//   ],
//   templateUrl: './graph.component.html',
//   styleUrl: './graph.component.css'
// })
// export class GraphComponent {
//   @ViewChild("chart") chart!: ChartComponent;
//   public chartOptions: Partial<ChartOptions>;
//   @Input() name: string[] = [];
//   @Input() data: number[] = [];
//   @Input() label: string = '';
//   @Input() value: string = '';
//   @Input() percentageChange: number = 0;
//
//   constructor() {
//     this.chartOptions = {
//       series: [],
//       chart: {
//         type: "area",
//         height: 200,
//         sparkline: {
//           enabled: true
//         }
//       },
//       fill: {
//         opacity: 0.3
//       },
//       dataLabels: {
//         enabled: false
//       },
//       labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200
//             },
//             legend: {
//               position: "bottom"
//             }
//           }
//         }
//       ]
//     };
//   }
//
//   // ngOnInit() {
//   //   this.chartOptions.series = [{ name: this.label, data: this.data }];
//   // }
// }

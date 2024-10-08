import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import { Component, OnInit, Renderer2, ViewChild , Inject} from '@angular/core';
import {NgClass, DOCUMENT, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";
import {MerchantService} from "../merchant-management/merchant.service";
import {ContractService} from "../contract-creation/contract.service";
import {NgxChartsModule, ScaleType} from "@swimlane/ngx-charts";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  NgApexchartsModule
} from "ng-apexcharts";

import {ChartOptions} from "../../app.component";
import {AuthService} from "../../authentication/auth.service";




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, NgClass, FormsModule, NgIf, RouterLink, NgOptimizedImage, NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Or use Tailwind CSS classes directly
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> = {
    series: [/* series data */],
    chart: { type: "line", height: 350 },
    xaxis: { type: "datetime" },
    stroke: { curve: "smooth" },
    dataLabels: { enabled: false },
    yaxis: { title: { text: "Count" } },
    title: { text: "Merchant and Contract Tracking", align: "left" },
    subtitle: { text: "Monthly and Weekly Data", align: "left" },
    labels: this.getLabels(),
    legend: { horizontalAlign: "left" },
    annotations: {
      xaxis: [/* x-axis annotations */],
      yaxis: [/* y-axis annotations */]
    }
  };
  searchQuery: string = '';
  tasks: { name: string; completed: boolean }[] = [];
  newTask: string = '';
  merchantData: any[] = [];
  contractData: any[] = [];
  totalMerchants = 0;
  totalContracts = 0;
  totalCases = 0;
  totalDrops = 9;
  totalRemovals = 1;
  totalVerifications = 1;
  smartBoxStatus="up";
  contractEngineStatus ="up";
  username: string | null = null;
  users = [
    {
      name: 'Hafssa El Omrani',
      email: 'leslie.alexander@gmail.com',
      image: '/assets/user/user-02.png'
    },
    {
      name: 'Yahya Saadaoui',
      email: 'yahya.saadaoui@gmail.com',
      image: '/assets/user/dev.png'
    }
    ,
    {
      name: 'Ilyas El Omrani',
      email: 'leslie.alexander@gmail.com',
      image: '/assets/user/user-03.png'
    }
  ];
  constructor(
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              private merchantService: MerchantService,
              private contractService: ContractService,
              private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.merchantService.getMerchants().subscribe(merchants => {
      this.totalMerchants = merchants.length;
    });

    this.contractService.getContracts().subscribe(contracts => {
      this.totalContracts = contracts.length;
    });
    this.merchantService.getMerchants().subscribe(merchants => {
      this.totalMerchants = merchants.length;
      this.updateMerchantData();
    });

    this.contractService.getContracts().subscribe(contracts => {
      this.totalContracts = contracts.length;
      this.updateContractData();
    });
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
    this.initializeChart();
    this.username = this.authService.getUsernameFromToken();
  }

  initializeChart(): void {
    this.chartOptions = {
      series: [
        {
          name: "Merchants",
          data: this.merchantData
        },
        {
          name: "Contracts",
          data: this.contractData
        }
      ],
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Merchant and Contract Tracking",
        align: "left"
      },
      subtitle: {
        text: "Monthly and Weekly Data",
        align: "left"
      },
      labels: this.getLabels(), // Function to generate labels for the x-axis
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "Count"
        }
      },
      legend: {
        horizontalAlign: "left"
      },
      annotations: {
        xaxis: [
          {
            x: new Date('2024-03-01').getTime(),
            borderColor: '#FF4560',
            label: {
              borderColor: '#FF4560',
              style: {
                color: '#fff',
                background: '#FF4560'
              },
              text: 'Annotation 1'
            }
          },
          {
            x: new Date('2024-06-01').getTime(),
            borderColor: '#775DD0',
            label: {
              borderColor: '#775DD0',
              style: {
                color: '#fff',
                background: '#775DD0'
              },
              text: 'Annotation 2'
            }
          }
        ],
        yaxis: [
          {
            y: 50,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#fff',
                background: '#00E396'
              },
              text: 'Y Annotation'
            }
          }
        ]
      }
    };
  }
  filteredUsers() {
    if (!this.searchQuery.trim()) {
      return this.users;
    }
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  // Save tasks to localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ name: this.newTask, completed: false });
      this.newTask = '';
      this.saveTasks();
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  toggleTaskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  editTask(index: number) {
    const updatedTask = prompt("Edit task:", this.tasks[index].name);
    if (updatedTask !== null) {
      this.tasks[index].name = updatedTask;
      this.saveTasks();
    }
  }

  updateMerchantData(): void {
    // Example data processing, adjust as needed
    this.merchantData = this.processData(this.totalMerchants);
  }

  updateContractData(): void {
    // Example data processing, adjust as needed
    this.contractData = this.processData(this.totalContracts);
  }

  processData(count: number): any[] {
    // Implement your data processing logic here
    // Return data in the format required by ApexCharts
    return [
      { x: new Date().toISOString(), y: count }
      // Add more data points as needed
    ];
  }

  getLabels(): string[] {
    // Generate or fetch labels for the x-axis
    return [
      "2024-01-01",
      "2024-02-01",
      "2024-03-01",
      "2024-04-01",
      "2024-05-01",
      "2024-06-01",
      "2024-07-01",
      "2024-08-01",
      "2024-09-01",
      "2024-10-01"

    ];
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { ApirequestService } from './services/apirequest.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import {  ApexNonAxisChartSeries,  ApexPlotOptions,  ApexChart,  ApexFill,  ApexStroke,  ApexDataLabels
} from 'ng-apexcharts';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, HighchartsChartModule, NgApexchartsModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'Angular_Task';
  allSelected: boolean = false;
  tableHeaders:any[] = [];
  tableData:any[] = [];
  showConfirmation: boolean = false;
  showEditPopUp: boolean = false;
  itemToEditIndex: number = -1;
  editMemberData:any = {}
  vendorsMonitored = 240;
  totalAvailableSpots = 1000;
  usagePercentage = (this.vendorsMonitored / this.totalAvailableSpots) * 100;


  chartSeries: ApexNonAxisChartSeries = [this.usagePercentage];

  Highcharts: typeof Highcharts = Highcharts;

  stackedChartOptions: Highcharts.Options = {
    chart: { type: 'column', backgroundColor: 'transparent' },
    title: { text: '' },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { color: '#666' } }
    },
    yAxis: {
      min: 0,
      title: { text: 'Security rating' },
      gridLineColor: '#eee',
      labels: { style: { color: '#888' } }
    },
    tooltip: { shared: true },
    plotOptions: {
      column: {
        stacking: 'normal',
        borderRadius: 6,
        pointPadding: 0.2,
        groupPadding: 0.1
      }
    },
    legend: { enabled: false },
    series: [
      {
        name: 'Tier 1',
        type: 'column',
        data: [20, 30, 25, 20, 18, 28, 25, 22, 24, 28, 30, 26],
        color: '#e1dff4'
      },
      {
        name: 'Tier 2',
        type: 'column',
        data: [20, 30, 20, 25, 18, 30, 25, 26, 28, 26, 30, 25],
        color: '#a293f4'
      },
      {
        name: 'Tier 3',
        type: 'column',
        data: [20, 25, 15, 20, 15, 30, 20, 22, 20, 24, 28, 22],
        color: '#624af2'//'#e1dff4'
      }
    ]
  };

  chartDetails = {
    chart: {
      type: 'radialBar',
      height: 250,
      sparkline: {
        enabled: true
      }
    } as ApexChart,
  
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90, 
        hollow: {
          size: '75%',
          background: 'transparent'
        },
        track: {
          background: '#f0f0f0',
          strokeWidth: '100%',
          margin: 0,
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            fontSize: '22px',
            fontWeight: 'bold',
            offsetY: 10
          }
        }
      }
    } as ApexPlotOptions,
  
    fill: {
      colors: ['#7E51FF']
    } as ApexFill,
  
    stroke: {
      lineCap: 'round',
    } as ApexStroke
  };

constructor(private apiRequestService: ApirequestService){}

  ngOnInit(): void {
    this.getMembersList();


  }

  getMembersList(){
    const apiUrl = 'https://01.fy25ey01.64mb.io/'
    this.apiRequestService.getApiCall(apiUrl).subscribe(data => {
      
      let { grid_columns, grid_data } = data;
      this.tableHeaders = grid_columns;
      this.tableData = grid_data;
    });

    this.tableData.forEach(member => member['isSelected'] = false);
  }

  toggleAll(): void {
    this.allSelected = !this.allSelected;
    this.tableData.forEach(member => member.isSelected = this.allSelected);
  }

  checkIfAllSelected(): void {
    this.allSelected = this.tableData.every(member => member.isSelected);
  }



  editTeamMember(member:any){
    this.editMemberData = member;
    this.showEditPopUp = true;
  }

  deleteTeamMember(index: number) {
    this.itemToEditIndex = index;
    this.showConfirmation = true;
  }

  closeConfirmationPopup() {
    this.showConfirmation = false;
    this.editMemberData = {};
    this.showEditPopUp = false;
    this.itemToEditIndex = -1;
  }

  confirmDelete() {
    this.tableData.splice(this.itemToEditIndex, 1);
    this.closeConfirmationPopup();
  }


}


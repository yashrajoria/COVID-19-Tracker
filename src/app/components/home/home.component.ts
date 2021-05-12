import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';

import { GlobalDataSummary } from 'src/app/models/global-data';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  datatable = [];
  chart = {
    PieChart: "PieChart",
    ColumnChart: "ColumnChart",
    //LineChart: "LineChart",
    height: 500,
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        console.log(result);
        this.globalData = result;
        result.forEach((cs) => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalActive += cs.active;
            this.totalConfirmed += cs.confirmed;
            this.totalDeaths += cs.deaths;
            this.totalRecovered += cs.active;
          }
        });

        this.initChart('c');
      },
    });
  }

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);
  }

  initChart(caseType: string) {
    
    this.datatable = [];
    //this.datatable.push(["Country", "Cases"]);

    this.globalData.forEach((cs) => {
      let value: number;
      if (caseType == 'a') 
        if (cs.active >= 1000)
          value = cs.active;

      if (caseType == 'c')
        if (cs.confirmed > 10000)
          value = cs.confirmed;

      if (caseType == 'd')
        if (cs.deaths > 1000)
          value = cs.deaths;

      if (caseType == 'r')
        if (cs.recovered > 2000)
          value = cs.recovered;

        this.datatable.push([
          cs.country, value
        ])
      })
      console.log(this.datatable);


}
}


import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { chartConfigTopPrediction } from '../../../assets/charts/top-predicted-stocks';
import { chartConfigMostDamagedStocks } from '../../../assets/charts/most-damaged-stocks';
import { chartConfigOverstockSummary } from '../../../assets/charts/overstock-summary-view';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-graph-container',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './graph-container.component.html',
  styleUrl: './graph-container.component.scss',
})
export class GraphContainerComponent {
  title = 'ng-chart';
  chart: any = [];

  constructor() {}

  ngOnInit() {
    Chart.defaults.font.size = 18;
    this.chart.push(new Chart('canvas1', chartConfigTopPrediction));
    this.chart.push(new Chart('canvas2', chartConfigOverstockSummary));
    this.chart.push(new Chart('canvas3', chartConfigMostDamagedStocks));
  }
}

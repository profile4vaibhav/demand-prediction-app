import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PredictionTableComponent } from './components/prediction-table/prediction-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PredictionTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demand-prediction-app';
}

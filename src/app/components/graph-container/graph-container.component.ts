import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-graph-container',
  standalone: true,
  imports: [MatCardModule, NgxChartsModule],
  templateUrl: './graph-container.component.html',
  styleUrl: './graph-container.component.scss'
})
export class GraphContainerComponent {
  
}

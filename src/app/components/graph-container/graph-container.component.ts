import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-graph-container',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './graph-container.component.html',
  styleUrl: './graph-container.component.scss'
})
export class GraphContainerComponent {
  
}

import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PredictionTableComponent } from './components/prediction-table/prediction-table.component';
import { MatIconModule } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { GraphContainerComponent } from './components/graph-container/graph-container.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PredictionTableComponent, MatIconModule, MatTooltip, MatBadgeModule, MatMenuModule, MatButtonModule,
    MatSelectModule, MatFormFieldModule, MatButtonToggleModule, MatCheckboxModule, MatSlideToggleModule, CommonModule, GraphContainerComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _snackBar = inject(MatSnackBar);
  messages = [
    { message: 'First Message!', action: 'Got it' },
    { message: 'Second Message!', action: 'Okay' },
    { message: 'Third Message!', action: 'Dismiss' },
    { message: 'Fourth Message!', action: 'Close' }
  ];
  currentIndex = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hideSingleSelectionIndicator = signal(false);
  selectedSeverity: string = '';
  public selectedMenu: string = 'home';
  selected : any =  '';
  public isResetClicked: boolean = false;
  isWeekly = false;
  isMonthly = false;
  selectedValue: string = '';

  showNotifications = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update(value => !value);
  }

  onSelectionChange(event: any) {
    this.selectedSeverity = event.value; // Capture the selected value
  }

  openSnackBar() {
    const current = this.messages[this.currentIndex];
    this._snackBar.open(current.message, current.action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

    // Move to the next message and reset index if it reaches the end
    this.currentIndex = (this.currentIndex + 1) % this.messages.length;
  }

  onSidebarMenuClick(menu: string) {
    this.selectedMenu = menu;
  }

  reset() {
    this.selected = null;
    this.isResetClicked = true;
    this.isWeekly = false;
    this.isMonthly = false;
  }

  onSetResetToFalse(value: boolean) {
    this.isResetClicked = value;
  }

  onToggleChange(selected: string) {
    if (selected === 'weekly') {
      this.isWeekly = true;
      this.isMonthly = false;  // Turn off the Monthly toggle when Weekly is selected
      // this.selectedValue = selected;
    } else if (selected === 'monthly') {
      this.isWeekly = false;   // Turn off the Weekly toggle when Monthly is selected
      this.isMonthly = true;
    }
  }
}

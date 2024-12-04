import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PredictionTableComponent } from './components/prediction-table/prediction-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { GraphContainerComponent } from './components/graph-container/graph-container.component';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PredictionTableComponent,
    MatIconModule,
    MatTooltip,
    MatBadgeModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    CommonModule,
    GraphContainerComponent,
    FormsModule,
    MatDialogModule,
    AlertDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private _snackBar = inject(MatSnackBar);
  messages = [
    { message: 'First Message!', action: 'Got it' },
    { message: 'Second Message!', action: 'Okay' },
    { message: 'Third Message!', action: 'Dismiss' },
    { message: 'Fourth Message!', action: 'Close' },
  ];
  filters = ['Top 5', 'Top 10', 'Top 50'];
  currentIndex = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hideSingleSelectionIndicator = signal(false);
  selectedSeverity: string = '';
  public selectedMenu: string = 'home';
  selected: any = '';
  public isResetClicked: boolean = false;
  isWeekly = false;
  isMonthly = false;
  selectedValue: string = '';

  showNotifications = false;
  alerts: any[] = [];
  private alertIdCounter = this.alerts.length + 1;

  constructor(public dialog: MatDialog) {}

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update((value) => !value);
  }

  onSelectionChange(event: any) {
    this.selectedSeverity = event.value; // Capture the selected value
    this.isWeekly = false;
    this.isMonthly = false;
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
    this.selected = null;
  }

  onToggleChange(selected: string) {
    if (selected === 'weekly') {
      this.isWeekly = true;
      this.isMonthly = false; // Turn off the Monthly toggle when Weekly is selected
      // this.selectedValue = selected;
    } else if (selected === 'monthly') {
      this.isWeekly = false; // Turn off the Weekly toggle when Monthly is selected
      this.isMonthly = true;
    }
  }

  addAlert() {
    const alertTypes = [
      {
        message: 'Low Inventory',
        additionalInfo: 'The inventory for Coca-Cola is running low, with quantities expected to reach 200 units soon. Consider restocking to avoid shortages.',
        color: '#f44336',
      }, // Red
      {
        message: 'Overstock Prodcuts',
        additionalInfo: 'The current stock of Sprite exceeds the expected quantities by 200 units. Consider adjusting inventory or planning promotions to reduce surplus.',
        color: '#ff9800',
      }, // Orange
      {
        message: 'Expiry Stock',
        additionalInfo: 'The Pepsi 12-Pack is approaching its expiration date on January 4, 2025. Please prioritize its sale or consider alternate measures to minimize waste.',
        color: '#4caf50',
      }, // Green
      {
        message: 'New Damaged Goods',
        additionalInfo: '10 units of Mountain Dew 2L have been reported as damaged. Please initiate a replacement or restocking process to fulfill the shortfall.',
        color: '#2196f3',
      }, // Blue
    ];

    // Randomly pick an alert type
    const newAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];

    // Add the new alert to the alerts array
    this.alerts.push({
      id: this.alertIdCounter++, // Increment ID
      message: newAlert.message,
      additionalInfo: newAlert.additionalInfo,
      color: newAlert.color,
    });
  }

  closeAlert(event: Event, id: number) {
    event.stopPropagation(); // Prevent triggering the dialog
    this.alerts = this.alerts.filter((alert) => alert.id !== id);
  }

  // Function to open a dialog with the alert's message
  openDialog(message: string, additionalInfo: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { message, additionalInfo },
      width: '600px', // Set dialog width
      panelClass: 'custom-dialog-container', // Optional custom styles
    });
  }
}

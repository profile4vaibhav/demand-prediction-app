import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-prediction-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, HttpClientModule, MatSortModule, CommonModule, MatTooltip],
  templateUrl: './prediction-table.component.html',
  styleUrls: ['./prediction-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictionTableComponent
  implements OnInit, OnChanges, AfterViewInit
{
  displayedColumns: string[] = [
    'product',
    'currentStockLevel',
    'predictedDemand',
    'recommendedReorderQuantity',
  ];
  dataSource = new MatTableDataSource<any>([]); // Initialize with empty array
  originalData: any[] = []; // Maintain original data for filtering
  url = 'assets/Mockdata.csv';
  headerRow: [] | undefined;
  csvData: [] | undefined;
  private _liveAnnouncer = inject(LiveAnnouncer);
  @Input() severity: string | undefined;
  @Input() isResetClicked: boolean | undefined;
  @Output() setResetToFalse: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isWeekly: boolean | undefined;

  constructor(private http: HttpClient, private papa: Papa) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as any;
    this.dataSource.sort = this.sort as any;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['severity'] && changes['severity'].currentValue) {
      // Filter the original data instead of the current dataSource data
      const filteredData = this.originalData.filter((item: any) => {
        return item.skuColor === changes['severity'].currentValue;
      });

      // Update the dataSource with the filtered data
      this.dataSource.data = filteredData;
    } else if (changes['isResetClicked'] && changes['isResetClicked'].currentValue === true) {
      this.setResetToFalse.emit(false);
      this.url = 'assets/Mockdata.csv';
      this.loadCSVData();
    } else if (changes['isWeekly'] && changes['isWeekly'].currentValue) {
      this.setResetToFalse.emit(false);
      this.url = 'assets/Weeklymockdata.csv';
      this.loadCSVData();
    } else if (changes['isWeekly'] && changes['isWeekly'].currentValue === false && changes['isWeekly'].firstChange !== true) {
      this.setResetToFalse.emit(false);
      this.url = 'assets/Monthlymockdata.csv';
      this.loadCSVData();
    }
  }

  ngOnInit(): void {
    this.loadCSVData();
  }

  loadCSVData() {
    // Fetch CSV file from the assets folder
    this.http.get(this.url, { responseType: 'text' }).subscribe((csvData) => {
      // Parse the CSV data using Papa from ngx-papaparse
      this.papa.parse(csvData, {
        complete: (result) => {
          this.csvData = result.data; // Assign the parsed data

          // Save the original data
          this.originalData = [...(this.csvData as any)]; // Keep a copy of the original data

          // Set the data into the table
          this.dataSource.data = this.csvData as any; // Populate the table with data
        },
        header: true, // If your CSV has headers, set this to true
        skipEmptyLines: true, // Skip empty lines
      });
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

export interface PeriodicElement {
  product: string;
  currentStockLevel: string;
  predictedDemand: string;
  recommendedReorderQuantity: string;
  skuColor: string;
}

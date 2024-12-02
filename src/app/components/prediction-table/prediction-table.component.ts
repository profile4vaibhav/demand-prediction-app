import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-prediction-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, HttpClientModule, MatSortModule],
  templateUrl: './prediction-table.component.html',
  styleUrls: ['./prediction-table.component.scss']
})
export class PredictionTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['product', 'currentStockLevel', 'predictedDemand', 'recommendedReorderQuantity', 'skuColor'];
  dataSource = new MatTableDataSource<any>([]);  // Initialize with empty array
  url = "assets/Mockdata.csv";
  headerRow: [] | undefined;
  csvData: [] | undefined;
  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor(private http: HttpClient, private papa: Papa) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as any;
    this.dataSource.sort = this.sort as any;
  }

  ngOnInit(): void {
    this.loadCSVData();
  }

  loadCSVData() {
    // Fetch CSV file from the assets folder
    this.http.get(this.url, { responseType: 'text' }).subscribe(csvData => {
      // Parse the CSV data using Papa from ngx-papaparse
      this.papa.parse(csvData, {
        complete: (result) => {
          this.csvData = result.data;  // Assign the parsed data

          // Set the data into the table
          this.dataSource.data = this.csvData as any; // Populate the table with data
        },
        header: true,  // If your CSV has headers, set this to true
        skipEmptyLines: true  // Skip empty lines
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

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  imageUrl = 'https://www.researchgate.net/profile/Priscila-Farias-3/publication/332517289/figure/fig7/AS:749215688953857@1555638348119/Truck-body-scheme-designed-from-photos-of-truck-bodies-produced-by-Carrocerias-Garcia-in.jpg';
  data = [
    { slNo: 1, date: '10/04/2024', position: '1L0', tyrePressure: 23, tNo: 101, tDepth: '7.0 mm', tComplaint: 'Wear and Tear', tMileage: '35,000 km' },
    { slNo: 2, date: '10/04/2024', position: '1R0', tyrePressure: 30, tNo: 102, tDepth: '6.5 mm', tComplaint: 'Flat Spotting', tMileage: '32,000 km' },
    { slNo: 3, date: '10/04/2024', position: '2L0', tyrePressure: 33, tNo: 103, tDepth: '7.2 mm', tComplaint: 'Uneven Wear', tMileage: '40,000 km' },
    { slNo: 4, date: '10/04/2024', position: '2L1', tyrePressure: 33, tNo: 104, tDepth: '7.5 mm', tComplaint: 'Cracking', tMileage: '42,000 km' },
    { slNo: 5, date: '10/04/2024', position: '2R0', tyrePressure: 28, tNo: 105, tDepth: '6.8 mm', tComplaint: 'Blistering', tMileage: '38,000 km' },
    { slNo: 6, date: '10/04/2024', position: '2R1', tyrePressure: 40, tNo: 106, tDepth: '7.3 mm', tComplaint: 'Wear and Tear', tMileage: '36,000 km' },
    { slNo: 7, date: '10/04/2024', position: '3L0', tyrePressure: 42, tNo: 107, tDepth: '7.1 mm', tComplaint: 'Flat Spotting', tMileage: '33,000 km' },
    { slNo: 8, date: '10/04/2024', position: '3L1', tyrePressure: 29, tNo: 108, tDepth: '7.4 mm', tComplaint: 'Uneven Wear', tMileage: '41,000 km' },
    { slNo: 9, date: '10/04/2024', position: '3R0', tyrePressure: 27, tNo: 109, tDepth: '6.9 mm', tComplaint: 'Cracking', tMileage: '39,000 km' },
    { slNo: 10, date: '10/04/2024', position: '3R1', tyrePressure: 28, tNo: 110, tDepth: '7.6 mm', tComplaint: 'Blistering', tMileage: '43,000 km' },
    { slNo: 11, date: '10/04/2024', position: '4L0', tyrePressure: 89, tNo: 111, tDepth: '7.2 mm', tComplaint: 'Wear and Tear', tMileage: '34,000 km' },
    { slNo: 12, date: '10/04/2024', position: '4L0', tyrePressure: 89, tNo: 112, tDepth: '7.5 mm', tComplaint: 'Flat Spotting', tMileage: '37,000 km' },
    { slNo: 13, date: '10/04/2024', position: '4R0', tyrePressure: 89, tNo: 113, tDepth: '7.1 mm', tComplaint: 'Uneven Wear', tMileage: '40,500 km' },
    { slNo: 14, date: '10/04/2024', position: '4R1', tyrePressure: 89, tNo: 114, tDepth: '7.4 mm', tComplaint: 'Cracking', tMileage: '41,500 km' },
    { slNo: 15, date: '10/04/2024', position: '5L0', tyrePressure: 89, tNo: 115, tDepth: '6.8 mm', tComplaint: 'Blistering', tMileage: '38,000 km' },
    { slNo: 16, date: '10/04/2024', position: '5L1', tyrePressure: 89, tNo: 116, tDepth: '7.3 mm', tComplaint: 'Wear and Tear', tMileage: '36,000 km' },
    { slNo: 17, date: '10/04/2024', position: '5R0', tyrePressure: 89, tNo: 117, tDepth: '7.0 mm', tComplaint: 'Flat Spotting', tMileage: '35,000 km' },
    { slNo: 18, date: '10/04/2024', position: '5R1', tyrePressure: 89, tNo: 118, tDepth: '7.6 mm', tComplaint: 'Uneven Wear', tMileage: '41,000 km' },
    { slNo: 19, date: '10/04/2024', position: '6L0', tyrePressure: 89, tNo: 119, tDepth: '7.4 mm', tComplaint: 'Cracking', tMileage: '42,000 km' },
    { slNo: 20, date: '10/04/2024', position: '6L1', tyrePressure: 89, tNo: 120, tDepth: '7.2 mm', tComplaint: 'Blistering', tMileage: '43,000 km' },
    { slNo: 21, date: '10/04/2024', position: '6R0', tyrePressure: 89, tNo: 121, tDepth: '7.5 mm', tComplaint: 'Wear and Tear', tMileage: '40,000 km' },
    { slNo: 22, date: '10/04/2024', position: '6R1', tyrePressure: 89, tNo: 122, tDepth: '7.3 mm', tComplaint: 'Flat Spotting', tMileage: '37,000 km' },
  ];
  isCollapsed = true;
  selectedPosition = '';
  globalSearchText = '';

  tableData = [];

  filteredData = [];

  dateFilter = '';

  positionFilter = '';

  searchText = '';

  currentPage = 1;
  rowsPerPage = 5;
  totalPages = Math.ceil(this.data.length / this.rowsPerPage);
  totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);

  tooltips = [
    { left: '100px', top: '20px', content: 'himachi' },
    { left: '300px', top: '200px', content: 'Tooltip 2' },
    { left: '400px', top: '400px', content: 'Tooltip 3' }
  ];

  constructor() { }

  ngOnInit() {
    this.populateTable(this.currentPage);
  }

  populateTable(page: number): void {
    const start = (page - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.tableData = this.data.slice(start, end);
  }

  changePage(delta: number): void {
    if (this.currentPage + delta >= 1 && this.currentPage + delta <= this.totalPages) {
      this.currentPage += delta;
      this.populateTable(this.currentPage);
    }
  }
  toggleFilter() {
    this.isCollapsed = !this.isCollapsed;
  }
  applyFilters(): void {
    this.tableData = this.data.filter(item => {
      const dateMatch = !this.dateFilter || item.date === this.dateFilter;
      const positionMatch = !this.positionFilter || item.position === this.positionFilter;
      const searchMatch = !this.searchText ||
        item.slNo.toString().includes(this.searchText) ||
        item.tNo.toString().includes(this.searchText) ||
        item.tComplaint.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.tMileage.toString().includes(this.searchText) ||
        item.tDepth.toString().includes(this.searchText) ||
        item.tyrePressure.toString().includes(this.searchText);

      return dateMatch && positionMatch && searchMatch;
    });

    this.totalPages = Math.ceil(this.tableData.length / this.rowsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    this.currentPage = 1;

    this.populateTable(this.currentPage);
  }

  isPrevDisabled(): boolean {
    return this.currentPage === 1;
  }

  isNextDisabled(): boolean {
    return this.currentPage === this.totalPages;
  }
}

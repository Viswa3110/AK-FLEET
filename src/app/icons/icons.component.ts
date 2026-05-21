import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  
  data = [
    { 
        'Sl.No': 1,
        'User Profile': '13421',
        'Vehicle Details': '4',
        'New Tyres Purchase': 'TN 41 AV 3456',
        'Tyre Complaint': '01/02/2024',
        'Driver Shift change': '05/06/2024'
    }
];
selectedRow: any;
  isCollapsed = true;
  selectedPosition = '';
  globalSearchText = '';

  tableData = [];

  filteredData = [];

  dateFilter = '';

  positionFilter = '';

  searchText = '';

  currentPage = 1;
  rowsPerPage = 10;
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
  editRow(row: any) {
    this.selectedRow = { ...row };
    console.log("row", row)
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
}

saveChanges() {
    // Implement your save changes logic here
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}
closeModal(modalId: string): void {
  const modal = document.getElementById(modalId);
  if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
  }
}
toggleFilter1(){
  console.log("hi")
  const modal = document.getElementById('openModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
}

openDeleteModal(row: any) {
    this.selectedRow = { ...row };
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
}

deleteSelectedRow() {
    const index = this.tableData.findIndex(row => row === this.selectedRow);
    if (index > -1) {
        this.tableData.splice(index, 1);
    }
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'block';
    }
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
 

  isPrevDisabled(): boolean {
    return this.currentPage === 1;
  }

  isNextDisabled(): boolean {
    return this.currentPage === this.totalPages;
  }

}

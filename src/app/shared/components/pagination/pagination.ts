import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  @Input() pageNumber!: number;
  @Input() totalPages!: number;
  @Input() hasPreviousPage!: boolean;
  @Input() hasNextPage!: boolean;
   @Output() pageChanged = new EventEmitter<number>();

   changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.pageChanged.emit(page);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  
}

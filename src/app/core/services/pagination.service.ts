// pagination.service.ts
import { Injectable, Input } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PaginationService {
    // Pagination
    pageSize: any = 5;
    page: any = 1;
    startIndex: number = 1;
    endIndex: number = 9;
    //sort direction
    private sortColumn: string = '';
    private sortDirection: 'asc' | 'desc' = 'asc';

    changePage(alldata: any[], pageSize:number) {
        const startItem = (this.page - 1) * pageSize + 1;
        const endItem = (this.page - 1) * pageSize + pageSize;
        this.endIndex = endItem;
        if (this.endIndex > alldata.length) {
            this.endIndex = alldata.length;
        }
        return alldata.slice(startItem - 1, endItem);
    }

    onSort(column: string, items: any[], isAscending: boolean = true): any[] {
      return [...items].sort((a, b) => {
        const valueA = this.getNestedProperty(a, column);
        const valueB = this.getNestedProperty(b, column);
        if (valueA == null && valueB == null) return 0;
        if (valueA == null) return isAscending ? 1 : -1;
        if (valueB == null) return isAscending ? -1 : 1;
        if (this.isDate(valueA) || this.isDate(valueB)) {
          const dateA = new Date(valueA).getTime();
          const dateB = new Date(valueB).getTime();
          return isAscending ? dateA - dateB : dateB - dateA;
        }
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return isAscending ? valueA - valueB : valueB - valueA;
        }
        if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
          return isAscending 
            ? (valueA === valueB ? 0 : valueA ? -1 : 1)
            : (valueA === valueB ? 0 : valueA ? 1 : -1);
        }
        return isAscending 
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      });
    }

    private isDate(value: any): boolean {
      return value instanceof Date || 
            (typeof value === 'string' && !isNaN(Date.parse(value)));
    }

    private getNestedProperty(obj: any, path: string): any {
      return path.split('.').reduce((o, p) => {
        if (o == null) return null;
        
        const arrayMatch = p.match(/(\w+)\[(\d+)\]/);
        if (arrayMatch) {
          const arrayName = arrayMatch[1];
          const index = parseInt(arrayMatch[2]);
          return o[arrayName]?.[index];
        }
        
        return o[p];
      }, obj);
    }

}

import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { fetchCryptoOrderData } from 'src/app/store/Crypto/crypto_action';
import { selectCryptoLoading, selectCryptoOrderData } from 'src/app/store/Crypto/crypto_selector';
import { cloneDeep } from 'lodash';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

/**
 * Orders Component
 */
export class OrdersComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  Sell = 'Sell';
  Buy = 'Buy';
  Successful = 'Successful';
  Cancelled = 'Cancelled';
  Pending = 'Pending';

  // Table data
  OrdersList!: any;
  orders: any;
  searchResults: any;
  searchTerm: any;
  type: any ='';
  status: any='';
  date: any;

  constructor(public service: PaginationService,
    private store: Store<{ data: RootReducerState }>) {
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Crypto' },
      { label: 'Orders', active: true }
    ];

    // Fetch Data
    this.store.dispatch(fetchCryptoOrderData());
    this.store.select(selectCryptoLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });

    this.store.select(selectCryptoOrderData).subscribe((data) => {
      this.orders = data;
      this.OrdersList = cloneDeep(data);
      this.orders = this.service.changePage(this.OrdersList)
    });
  }
 
  // Pagination
  changePage() {
    this.orders = this.service.changePage(this.OrdersList)
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.OrdersList.filter((item: any) => {
      return (
        item.coinName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.quantity.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.orders = this.service.changePage(this.searchResults)
  }

  // Sort Data
  onSort(column: any) {
    this.orders = this.service.onSort(column, this.orders)
  }

  // Filter
  typeFilter() {
    if (this.type != '') {
      this.orders = this.OrdersList.filter((order: any) => order.type == this.type);
    } else {
      this.orders = this.service.changePage(this.OrdersList)
    }
  }

  statusFilter() {
    if (this.status != '') {
      this.orders = this.OrdersList.filter((order: any) => order.status == this.status);
    } else {
      this.orders = this.service.changePage(this.OrdersList)
    }
  }
}

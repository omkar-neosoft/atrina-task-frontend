import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  successAlert: string = '';
  errorAlert: string = '';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadStock();

    this.stockService.stockUpdates$.subscribe((update) => {
      if (update) {
        const product = this.products.find((p) => p.id === update.productId);
        if (product) product.stock = update.newStock;
      }
    });
  }

  loadStock() {
    this.stockService.getProducts().subscribe((data: any) => {
      this.products = data.map((p: any) => ({ ...p, orderQty: 1 }));
    });
  }

  placeOrder(productId: number, qty: number) {
    const product = this.products.find((data) => data.id === productId);
    console.log({
      'product.orderQty > product.stock': product.orderQty > product.stock,
    });
    console.log({ 'product.orderQty': product.orderQty });
    console.log({ 'product.stock': product.stock });
    if (
      product.orderQty > product.stock ||
      product.stock < 1 ||
      product.orderQty < 1
    ) {
      if (product.orderQty < 1) {
        this.errorAlert = 'Quantity must be grater than 0';
      } else {
        this.errorAlert = 'Quantity is more than stock';
      }
      setTimeout(() => {
        this.errorAlert = '';
      }, 5000);
      return;
    }
    this.stockService.placeOrder(productId, qty).subscribe({
      next: (res: any) => {
        this.successAlert = res.message;
        setTimeout(() => {
          this.successAlert = '';
        }, 5000);
      },
      error: (err) => {
        this.errorAlert = err;
        setTimeout(() => {
          this.errorAlert = '';
        }, 5000);
      },
    });
    // else {
    //   this.errorAlert = 'Quantity is more than stock';
    //   setTimeout(() => {
    //     this.errorAlert = '';
    //   }, 5000);
    // }
  }
}

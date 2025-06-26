import { Component } from '@angular/core';
import { OrderService } from '../../service/order/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  orders: any[] = [];
  successAlert: string = '';
  errorAlert: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();

    this.orderService.statusUpdate$.subscribe((update) => {
      console.log({ update });
      if (update) {
        const order = this.orders.find((o) => o.id === update.orderId);
        if (order) {
          order.deliveryStatus = update.deliveryStatus;
        }
      }
    });
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe((data: any) => {
      this.orders = data;
    });
  }
}

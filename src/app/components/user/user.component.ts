import { Component } from '@angular/core';
import { OrderService } from '../../service/order/order.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
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

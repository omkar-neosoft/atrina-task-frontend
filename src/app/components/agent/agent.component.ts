import { Component } from '@angular/core';
import { StockService } from '../../service/stock.service';
import { OrderService } from '../../service/order/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css',
})
export class AgentComponent {
  orders: any[] = [];
  successAlert: string = '';
  errorAlert: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();

    this.orderService.statusUpdate$.subscribe((update) => {
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

  updateDeliveryStatus(productId: number, deliveryStatus: string) {
    // const order = this.orders.find((data) => data.id === productId);

    console.log({ productId, deliveryStatus });
    this.orderService
      .updateDeliveryStatus(productId, deliveryStatus)
      .subscribe({
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
  }
}

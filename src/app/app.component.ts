import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderService } from './service/order/order.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  deliveryStatusUpdateAlert: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.statusUpdate$.subscribe((update) => {
      if (update) {
        this.deliveryStatusUpdateAlert = `Delivery status for order id: ${update.orderId} is updated as: ${update.deliveryStatus}`;
        console.log({
          deliveryStatusUpdateAlert: this.deliveryStatusUpdateAlert,
        });
        setTimeout(() => {
          this.deliveryStatusUpdateAlert = '';
        }, 5000);
      }
    });
  }
}

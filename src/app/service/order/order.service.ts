import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'https://localhost:7001/api/Order';
  private hubConnection!: signalR.HubConnection;

  private statusUpdate = new BehaviorSubject<any>(null);
  statusUpdate$ = this.statusUpdate.asObservable();

  constructor(private http: HttpClient) {
    this.connectSignalR();
  }

  connectSignalR() {
    // this.hubConnection = new signalR.HubConnectionBuilder()
    //   .withUrl('https://localhost:7001/deliveryStatusHub')
    //   .build();

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7001/deliveryStatusHub', {
        transport: signalR.HttpTransportType.LongPolling,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected for deliveryStatusHub');
      })
      .catch((err) => console.error('SignalR connection error:', err));

    this.hubConnection.on(
      'ReceiveDeliveryStatusUpdate',
      (orderId, deliveryStatus) => {
        console.log('ReceiveDeliveryStatusUpdate');
        console.log({ deliveryStatus });
        this.statusUpdate.next({ orderId, deliveryStatus });
      }
    );
  }

  getAllOrders() {
    return this.http.get(`${this.baseUrl}/GetAllOrders`);
  }

  updateDeliveryStatus(productId: number, deliveryStatus: string) {
    return this.http.put(`${this.baseUrl}`, {
      id: productId,
      deliveryStatus,
    });
  }
}

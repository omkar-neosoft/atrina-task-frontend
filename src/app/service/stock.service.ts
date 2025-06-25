import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StockService {
  private baseUrl = 'https://localhost:7001/api/Order';
  private hubConnection!: signalR.HubConnection;

  private stockUpdates = new BehaviorSubject<any>(null);
  stockUpdates$ = this.stockUpdates.asObservable();

  constructor(private http: HttpClient) {
    this.connectSignalR();
  }

  connectSignalR() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7001/stockHub')
      .build();

    this.hubConnection.start().then(() => {
      console.log('SignalR Connected');
    });

    this.hubConnection.on('ReceiveStockUpdate', (productId, newStock) => {
      this.stockUpdates.next({ productId, newStock });
    });
  }

  getProducts() {
    return this.http.get(`${this.baseUrl}/products`);
  }

  placeOrder(productId: number, quantity: number) {
    return this.http.post(`${this.baseUrl}`, {
      productId: productId,
      quantity,
    });
  }

  // private hubConnection: signalR.HubConnection;
  // private stockUpdates = new BehaviorSubject<any>(null);
  // stockUpdates$ = this.stockUpdates.asObservable();

  // constructor() {
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl('https://localhost:7001/stockHub')
  //     .build();

  //   this.hubConnection.start().then(() => {
  //     console.log('SignalR Connected');
  //   });

  //   this.hubConnection.on('ReceiveStockUpdate', (productId, newStock) => {
  //     this.stockUpdates.next({ productId, newStock });
  //   });
  // }
}

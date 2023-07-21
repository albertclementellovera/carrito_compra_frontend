import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderId: number;

  constructor() { }

  setOrderId(orderId: number) {
    this.orderId = orderId;
  }

  getOrderId() {
    return this.orderId;
  }
}

export interface DetailOne {
  orderId: number;
  productName: string;
  quantity: number;
  productId: number;
}

export interface Details {
  productId: number;
  productName: string;
  quantity: number;
}

export interface Order {
  name: string;
  shippingAddress: string;
  city: string;
  createdDate: Date;
  delivery: boolean;
  id: number;
  store_id: number;
  store_name: string;
}

export interface DetailsOrder {
  details: Details[];
  orderId: number;
}

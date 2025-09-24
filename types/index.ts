export interface OrderData {
    orderId: string;
    customerName: string;
    email: string;
    shippingAddress: {
      name: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      phone: string;
    };
    billingAddress: {
      name: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    paymentMethod: string;
    shippingMethod: string;
    items: Array<{
      id: string;
      name: string;
      image: string;
      price: number;
      quantity: number;
    }>;
    subtotal: number;
    shipping: number;
    total: number;
    currency: string;
  }
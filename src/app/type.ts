export interface Product {
    _id: string;
    name: string;
    type: string;
    fuelCapacity: number;
    transmission: string;
    seatingCapacity: number;
    pricePerDay: number;
    slug: { current: string };
    image: { asset: { url: string } };
  }
  
  export interface Payment {
    _type: 'payment';
    product: {
      _type: 'reference';
      _ref: string;
    };
    amount: number;
    currency: string;
    status: string;
    paymentId: string;
    date: string;
  }
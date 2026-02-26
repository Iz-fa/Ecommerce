interface CartItemType {
  id: number;
  productId: string;
  quantity: number;
  deliveryOptionId: string;
  createdAt: string;
  updatedAt: string;
  product: ProductType;
}

interface ProductType {
    id: string;
    name: string;
    image: string;
    priceCents: number;
    rating:{
      count: number;
      stars: number;
    };
    keywords: string[];
}

interface OrderProductType {
  productId: string;
  quantity: number;
  estimatedDeliveryTimeMs: number;
  product: ProductType;
}

interface OrderType {
  id: string;
  totalCostCents: number;
  orderTimeMs: number;
  products: OrderProductType[];
}

interface DeliveryOptionsType {
  id: string;
  deliveryDays: number;
  priceCents: number;
  estimatedDeliveryTimeMs: number;
}

interface PaymentSummaryType {
  totalItems: number;
  productCostCents: number;
  shippingCostCents: number;
  totalCostBeforeTaxCents: number;
  taxCents: number;
  totalCostCents: number;
}

export type {CartItemType, OrderType, ProductType, DeliveryOptionsType, PaymentSummaryType};
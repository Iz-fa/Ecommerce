import axios from 'axios';
import { useState, useEffect } from 'react';
import {CheckoutHeader} from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';
import type {CartItemType, PaymentSummaryType, DeliveryOptionsType} from '../../types';

type  Props = {
    cart: CartItemType[];
    loadCart: ()=>Promise<void>;
};

export function CheckoutPage({ cart, loadCart }: Props) {
    const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptionsType[]>([]);
    const [paymentSummary, setPaymentSummary] = useState<PaymentSummaryType|null>(null);

    useEffect(()=>{
        const fetchCheckoutData= async()=>{
            const response = await axios.get('https://e-commerce-backend-xwcy.onrender.com/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);
        };

        fetchCheckoutData();
    },[]);

    useEffect(() => {
        const fetchPaymentSummary = async()=>{
            const response = await axios.get('https://e-commerce-backend-xwcy.onrender.com/api/payment-summary');
            setPaymentSummary(response.data);
        };

        fetchPaymentSummary();       
    }, [cart]);

    return (                 
        <>
            <link rel="icon" type="image/png" href="cart-favicon.png" /> 
            <title>Checkout</title>

            <CheckoutHeader cart={cart}/>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart ={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                    {paymentSummary && (
                        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
                    )}                    
                </div>
            </div>
        </>
    );
}
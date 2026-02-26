import { DeliveryOptions } from './DeliveryOptions';
import {CartItemDetails} from './CartItemDetails';
import {DeliveryDate} from './DeliveryDate';
import type {CartItemType, DeliveryOptionsType} from '../../types';

type  Props = {
    cart: CartItemType[];
    deliveryOptions: DeliveryOptionsType[];
    loadCart: ()=>Promise<void>;
};

export function OrderSummary({cart, deliveryOptions, loadCart }: Props) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {

                


                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <DeliveryDate deliveryOptions={deliveryOptions} cartItem={cartItem}/>

                        <div className="cart-item-details-grid">
                            <CartItemDetails cartItem = {cartItem} loadCart={loadCart} /> 

                            <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart}/>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
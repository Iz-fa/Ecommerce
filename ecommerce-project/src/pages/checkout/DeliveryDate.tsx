import dayjs from 'dayjs';
import type {CartItemType, DeliveryOptionsType} from '../../types';

type  Props = { 
    deliveryOptions: DeliveryOptionsType[];
    cartItem: CartItemType;
};

export function DeliveryDate({deliveryOptions, cartItem }: Props) {

    const selectedDeliveryOption = deliveryOptions
        .find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
        });
    if (!selectedDeliveryOption) return null;
    // this will loop through deliveryOptions and the first function
    // that returns true is gonna be the result(the right delivery option)

    return (
        <div className="delivery-date">
            Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>

    );
}
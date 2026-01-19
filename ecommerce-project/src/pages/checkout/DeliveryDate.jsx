import dayjs from 'dayjs';

export function DeliveryDate({deliveryOptions, cartItem }) {

    const selectedDeliveryOption = deliveryOptions
        .find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
        });
    // this will loop through deliveryOptions and the first function
    // that returns true is gonna be the result(the right delivery option)

    return (
        <div className="delivery-date">
            Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>

    );
}
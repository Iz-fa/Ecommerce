import { OrderHeader } from './OrderHeader';
import { OrderDetailsGrid } from './OrderDetailsGrid';
import type { OrderType} from '../../types';

type Props = {
    orders: OrderType[];
    loadCart: ()=> Promise<void>;
};

export function OrdersGrid({orders, loadCart}: Props) {
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">
                        <OrderHeader order={order} />
                        <OrderDetailsGrid order={order} loadCart={loadCart} />
                    </div>
                );
            })}
        </div>
    );
}
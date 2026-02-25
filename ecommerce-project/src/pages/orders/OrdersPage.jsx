import axios from 'axios';
import { useState, useEffect} from 'react';
import { Header } from '../../components/Header';
import { OrdersGrid } from './OrdersGrid';
import './OrdersPage.css';

export function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrdersData = async ()=>{
            const response = await axios.get('http://ecommerce-project-react-env.eba-9kp2yauw.us-east-1.elasticbeanstalk.com/api/orders?expand=products');    
            setOrders(response.data);
        };
        
        fetchOrdersData();
    }, []);

    return (
        <>
            <link rel="icon" type="image/png" href="orders-favicon.png" />
            <title>Orders</title>

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    );

}
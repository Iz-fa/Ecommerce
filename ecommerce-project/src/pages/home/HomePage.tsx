import axios from 'axios'; //cleaner way to make requests to the backend
import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router';
import { Header } from '../../components/Header';
import {ProductsGrid} from './ProductsGrid';
import LoadingSpinner from '../../assets/images/loading-spinner.gif';
import './HomePage.css';
import type {CartItemType, ProductType} from '../../types';

// Backend stores the data(normaly on a different computer) so the user's computer doesnt have to store all the
// products on their computer(It fetches only the products it needs to display)

// This also helps when adding an item to the cart, so when the user uses a different computer, the cart would
// still have the items inside
type  Props = {
    cart: CartItemType[];
    loadCart: ()=>Promise<void>;
};

export function HomePage({cart, loadCart}: Props) {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(()=>{   
        //the <StrictMode> in main.jsx makes useEffect run twice

        //useEffect cannot return a promise(it only returns nothing or a cleanup function)
        //that is why we made a const being an async function and called that function

        const fetchHomeData = async ()=>{ 
            const urlPath = search ? `https://e-commerce-backend-xwcy.onrender.com/api/products?search=${search}` : 'https://e-commerce-backend-xwcy.onrender.com/api/products';
            
            try{
                const response = await axios.get(urlPath);  
                setProducts(response.data); 
        
            } catch(err) {
                console.error(err);
                alert("Failed to load products! Please try again")
            } finally {
                setLoading(false);
            }
            
            
            //axios is an easier way instead of fetch .. .then response.json().then
        };

        fetchHomeData();
    }, [search]);
    

    return (        //The link bellow is the favicon(icon of the page)
        <>
            <link rel="icon" type="image/png" href="home-favicon.png" />
            <title>E-Commerce</title>

            <Header cart ={cart}/> 
            {loading ? 
                <div className="loading-container">
                    <p className="loading-text">
                        Please wait, the backend server needs some time to wake up due to inactivity...
                    </p> 
                    <img className="spinner" src={LoadingSpinner} alt="Loading..." />
                </div>
                :
                <div className="home-page">
                    <ProductsGrid products = {products} loadCart = {loadCart}/>
                </div>
            }           
            
        </>
    );
}
import {Header} from '../components/Header';
import type { CartItemType} from '../types';
import './ErrorPage.css';

type Props = {
    cart: CartItemType[];
};

export function ErrorPage({cart}: Props){
    return (
        <>
            <title>Page not found</title>
            <link rel="icon" type="image/png" href="home-favicon.png" />
            <Header cart ={cart}/>
            <div className="not-found-message">Error 404: Page not found</div>

        </>
    );

}
import {Header} from '../components/Header'
import './ErrorPage.css'

export function ErrorPage({cart}){
    return (
        <>
            <title>Page not found</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <Header cart ={cart}/>
            <div className="not-found-message">Error 404: Page not found</div>

        </>
    );

}
import {Product} from './Product';
import type {ProductType} from '../../types';

type  Props = {
    products: ProductType[];
    loadCart: ()=>Promise<void>;
};

export function ProductsGrid({products, loadCart}: Props) {

    return (
        <div className="products-grid">
            {products.map((product) => {
                return (
                    <Product key={product.id} product={product} loadCart={loadCart} />
                );
            })}

        </div>
    );
}
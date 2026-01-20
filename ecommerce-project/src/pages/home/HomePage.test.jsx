import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react'; 

// MemoryRouter is a router specificaly for testing
// We are using it because Header.jsx is using 'react-router'.
// The entire App.jsx is in a <BrowserRouter> so we didnt need to wrap <Header> with a router in other components
import {MemoryRouter} from 'react-router';

import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { HomePage } from './HomePage';

vi.mock('axios');

describe('HomePage component', () => {
    let loadCart;

    beforeEach(() => {
        loadCart = vi.fn();

        //Mocking the implementation means this fake fucntion will run instead of the real one when axios.get is called 
        
        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/products') {

                // The return value should match what the real axios.get returns
                // Since it returns an object, we also return an object here
                return {
                    data: [
                        {
                            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                            rating: {
                                stars: 4.5,
                                count: 87
                            },
                            priceCents: 1090,
                            keywords: ["socks", "sports", "apparel"]
                        },
                        {
                            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            image: "images/products/intermediate-composite-basketball.jpg",
                            name: "Intermediate Size Basketball",
                            rating: {
                                stars: 4,
                                count: 127
                            },
                            priceCents: 2095,
                            keywords: ["sports", "basketballs"]
                        }
                    ]
                };
            }
        });
    });

    it('displays the products correct', async () => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
            </MemoryRouter>           
        );

        //getAllByTestId is syncronous (it doesnt wait for elements to appear) unlike findAllByTestId    
         const productContainers = await screen.findAllByTestId('product-container');

         expect(productContainers.length).toBe(2);
         
         expect(
            within(productContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
         ).toBeInTheDocument();

         expect(
            within(productContainers[1]).getByText('Intermediate Size Basketball')
         ).toBeInTheDocument();
         
    });
});
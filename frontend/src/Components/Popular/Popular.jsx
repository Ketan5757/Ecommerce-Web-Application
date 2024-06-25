import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Popular = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/productsWithImage?limit=5');
                console.log(response)
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='Popular'>
            <h1><center>Popular in Womens</center></h1>
            <hr />
            <div className="popular-item">
                {products.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>

        </div>
    )
}
export default Popular
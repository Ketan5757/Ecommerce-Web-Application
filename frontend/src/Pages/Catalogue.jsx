import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/Catalogue.css'
import Item from '../Components/Item/Item';
import { useParams } from 'react-router-dom';

const Catalogue = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {category} = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let uri = `http://localhost:5000/productsWithImage${category ? `?category=${category}` : ''}`;
                const response = await axios.get(uri);
                console.log(response)
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='new-collections'>
            <h2><center>New Collections</center></h2>
            <hr />
            <div className="collections">
                {products.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}

            </div>
        </div>
    )
};

export default Catalogue;

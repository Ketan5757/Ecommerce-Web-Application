import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox.jsx/DescriptionBox';
import axios from 'axios';

const Product = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    // const {all_product}= useContext(ShopContext);
    const {productId} = useParams();
    // const product = all_product.find((e)=> e.id === Number(productId));

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/fetchProductDetails?id=${productId}`);  
                console.log(response.data)
                setProduct(response.data);  
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }
  return (
    <div>
    <Breadcrum product ={product}/>
    <ProductDisplay product ={product}/>
    <DescriptionBox/>
    </div>
  )
}

export default Product
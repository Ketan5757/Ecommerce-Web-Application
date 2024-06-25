import './CSS/Dashboard.css'
import { Table } from '../Components/Table/Table';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token'); 
                console.log("Token", token)
                if (!token) {
                    navigate("/admin");
                    return;
                }
                const response = await axios.get("http://localhost:5000/dashboardProducts", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data)
                setProducts(response.data);
            } catch (err) {
                console.log("Token Error", err.message)
                setError(err.message);
                navigate("/admin"); 
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="dashboard-main">
            <div className="main-container">
                <div className="content">
                    <Table data={products} />
                </div>
            </div> 
        </div>
    )
}

export default Dashboard;
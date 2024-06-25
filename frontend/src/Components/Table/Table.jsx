import React, { useState } from 'react';
import EditIcon from "../Assets/icons/edit.svg";
import TrashIcon from "../Assets/icons/trash.svg";
import CrossIcon from "../Assets/icons/cross.svg";
import CheckIcon from "../Assets/icons/check.svg";
import PlusIcon from "../Assets/icons/plus.svg";
import "./Table.css";

export const Table = ({ data }) => {
    const [products, setProducts] = useState(data);
    const [isEditIndex, setEditIndex] = useState(undefined);
    const initialFormData = {
        _id: "",
        id: "",
        name: "",
        category: "",
        new_price: 0,
        old_price: 0,
        image: ""
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result.split(',')[1] }); // Only store the base64 string
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onEdit = (productIndex) => {
        const product = products[productIndex];
        setFormData(product);
        setEditIndex(productIndex);
    };

    const onDelete = (productIndex) => {
        let newProductList = [...products];
        newProductList.splice(productIndex, 1);
        setProducts(newProductList);
    };

    const isEditMode = (index) => {
        return isEditIndex === index;
    };

    const onSave = async (index) => {
        let newProductList = [...products];
        const token = localStorage.getItem('token'); 
        try {
            const response = await fetch('http://localhost:5000/create-product', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            newProductList[index] = formData;
            setProducts(newProductList);
            setEditIndex(undefined);
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const onCancel = () => {
        setEditIndex(undefined);
    };

    const onAdd = async () => {
        const newId = Date.now();  
        const newProduct = { ...formData, id: newId };
        const newProducts = [newProduct, ...products];
        setProducts(newProducts);
        setEditIndex(0);
        setFormData({ ...initialFormData, id: newId });
    };

    return (
        <div>
            <div className="table-caption">
                <button className="add" onClick={onAdd}>
                    <span className="add-text">Add</span>
                    <img src={PlusIcon} alt="add icon" width={20} />
                </button>
                <div className="caption-heading">Admin Panel</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">New Price</th>
                        <th scope="col">Old Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, ind) => (
                        <tr key={product.id}>
                            <td data-label="Cover">
                                {isEditMode(ind) ? (
                                    <input name="image" type="file" onChange={handleImageChange} />
                                ) : (
                                    <img height={150} src={`data:image/png;base64,${product.image}`} alt="" />
                                )}
                            </td>
                            <td data-label="Name">
                                {isEditMode(ind) ? (
                                    <input name="name" className="edit-field-name" type="text" value={formData.name} onChange={handleOnChange} />
                                ) : (
                                    product.name
                                )}
                            </td>
                            <td data-label="Category">
                                {isEditMode(ind) ? (
                                    <input name="category" className="edit-field-description" type="text" value={formData.category} onChange={handleOnChange} />
                                ) : (
                                    product.category
                                )}
                            </td>
                            <td data-label="New Price">
                                {isEditMode(ind) ? (
                                    <input name="new_price" className="edit-field-price" type="number" value={formData.new_price} onChange={handleOnChange} />
                                ) : (
                                    product.new_price
                                )}
                            </td>
                            <td data-label="Old Price">
                                {isEditMode(ind) ? (
                                    <input name="old_price" className="edit-field-quantity" type="number" value={formData.old_price} onChange={handleOnChange} />
                                ) : (
                                    product.old_price
                                )}
                            </td>
                            <td data-label="Action">
                                {isEditMode(ind) ? (
                                    <>
                                        <input type="hidden" name="_id" value={formData._id} />
                                        <input type="hidden" name="id" value={formData.id} />
                                        <button className="check" onClick={() => onSave(ind)}>
                                            <img src={CheckIcon} alt="save icon" width={16} />
                                        </button>
                                        <button className="cancel" onClick={onCancel}>
                                            <img src={CrossIcon} alt="cancel icon" width={15} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit" onClick={() => onEdit(ind)}>
                                            <img src={EditIcon} alt="edit icon" width={15} />
                                        </button>
                                        <button className="delete" onClick={() => onDelete(ind)}>
                                            <img src={TrashIcon} alt="delete icon" width={15} />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

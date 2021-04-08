import React from 'react';

const Inventory = () => {

    const handleAddProduct=()=>{
        const product={};
        fetch('https://secure-plateau-02196.herokuapp.com/addProduct',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }

    return (
        <div>
            <form >
                <label htmlFor="">Name:</label>
                <input type="text"/>
                <label htmlFor="">Price:</label>
                <input type="number"/>
                <label htmlFor="">Quantity</label>
                <input type="number"/>
                <label htmlFor="">Product Image</label>
                <input type="file"/>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;
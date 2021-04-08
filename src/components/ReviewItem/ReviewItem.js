import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price,img}=props.product
    const reviewItem={
        display: 'flex',
        borderBottom:'1px solid lightgrey',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'2%',
        marginRight:'1%'
    }
    return (
        <div style={reviewItem}>
            <div>
                <img src={img} alt="product image" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <p>Quantity: {quantity}</p><br/>
                <p><small>$: {price}</small></p>
                <button onClick={()=>props.removeProduct(key)} className="add-cart-button">Remove Item</button>
            </div>
        </div>
    );
};

export default ReviewItem;
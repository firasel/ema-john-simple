import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import happyImage from '../../images/giphy.gif';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart,setCart]=useState([])
    const [orderPlaced,setOrderPlaced]=useState(false)
    const history = useHistory();
    
    const handleProceedCheckout=()=>{
        history.push('/shipment')
    }

    let thankYou;
    if(orderPlaced){
        thankYou= <img src={happyImage} alt="happy image"/>
    }

    const removeProduct=(productKey)=>{
        const newCart = cart.filter(pd=> pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart()
        const productKeys= Object.keys(savedCart)
        
        fetch('https://secure-plateau-02196.herokuapp.com/productsByKeys',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))
    },[])
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="add-cart-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
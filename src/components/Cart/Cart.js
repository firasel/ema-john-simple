import React from 'react';

const Cart = (props) => {
    const cart=props.cart
    const totalPrice=cart.reduce((total,current)=>total+current.price,0)

    const formatNumber=num=>{
        const precision=num.toFixed(2)
        return Number(precision)
    }
    let shippingPrice=0
    if(totalPrice>0){
        if(totalPrice<15){
            shippingPrice=3.50
        }else if(totalPrice<35){
            shippingPrice=5
        }else if(totalPrice<100){
            shippingPrice=20
        }else{
            shippingPrice=0
        }
    }
    const tax=totalPrice/10


    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>product Price: {formatNumber(totalPrice)}</p>
            <p>Shipping Cost: {formatNumber(shippingPrice)}</p>
            <p>Tax + VAT: {formatNumber(tax)}</p>
            <p>Total Price: {formatNumber(totalPrice+shippingPrice+tax)}</p>
        </div>
    );
};

export default Cart;
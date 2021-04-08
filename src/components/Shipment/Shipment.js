import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const [shippingData,setShippingData] = useState(null);
    const onSubmit = data =>{
        setShippingData(data);
    };

    const handlePaymentSuccess= paymentId => {
        const savedCart = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser, 
            products: savedCart, 
            shipment: shippingData,
            paymentId,
            orderTime: new Date() }
        fetch('https://secure-plateau-02196.herokuapp.com/addOrder',{
            method:'POST',
            headers:{ 'Content-Type':'application/json'},
            body:JSON.stringify(orderDetails)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data){
                processOrder();
                alert('Ordered Placed Successfully')
            }
        })
    }

    return (
        <div className="row">
            <div style={{display: shippingData?'none':'block'}} className="col-md-6">
                <form className="formDesign" onSubmit={handleSubmit(onSubmit)}>
                    <label>Name</label>
                    <input className="inputDesign" name="name" ref={register({ required: true })} defaultValue={loggedInUser.name} />
                    {errors.name && <span>Name is required</span>}
                    
                    <label>Email</label>
                    <input className="inputDesign" name="email" ref={register({ pattern: /\S+@\S+\.\S+/ })} defaultValue={loggedInUser.email} />
                    {errors.email && <span>Email is required</span>}
                    
                    <label>Address</label>
                    <input className="inputDesign" name="address" ref={register({ required: true })} placeholder="Your Address" />
                    {errors.address && <span>Address is required</span>}

                    <label>Phone Number</label>
                    <input className="inputDesign" type="number" name="phoneNumber" ref={register({ required: true })} placeholder="Your Phone Number" />
                    {errors.phoneNumber && <span>Phone Number is required</span>}

                    <input className="buttonDesign" type="submit" value="Submit" />
                </form>
            </div>
            <div style={{display: shippingData?'block':'none'}} className="col-md-6">
                <h2>Please pay for me</h2>
                <ProcessPayment handlePayment={handlePaymentSuccess} />
            </div>
        </div>
    );
};

export default Shipment;
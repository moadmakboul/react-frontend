import React, { useContext, useEffect, useState } from 'react';
import Slider from '../components/Slider';
import '../styles/homepage.css'
import LoadingGif from '../assets/Spinner-1s-200px.gif'
import HomeProduct from './components/HomeProduct';
import { ShopContext } from '../context/ShopContext';
import {LoginContext} from '../context/LoginContext'


const HomePage = () => {
    const {products, loadingPage, cartedProducts, productsToDisplay, getCart, putItemInCart, removeItemFromCart} = useContext(ShopContext)
    const {authTokens, user} = useContext(LoginContext)
    const [status, setStatus] = useState(null)
    

    useEffect(()=>{
        if (user){
            getCart(authTokens)
            setStatus(false)
        }
    }, [authTokens, cartedProducts.length, status])

    useEffect(()=>{
        let fetched = true
        if (fetched){
            console.log('trigged');
            productsToDisplay()
        }
        return () => {fetched = false}
    }, [])
   
    return (
        <div>
            <Slider />
            <div className='title'>
                <h1>Explore our products and enjoy shopping</h1>
            </div>
            {loadingPage ? <div className='spinner'><img src={LoadingGif} alt='' /></div> :
                <div id='box-products'>
                    {products !== null ?
                    products.map((product, key) => {
                        return <HomeProduct 
                        key={key} 
                        product={product} 
                        putItemInCart={putItemInCart} 
                        authTokens={authTokens} 
                        setStatus={setStatus}
                        removeItemFromCart = {removeItemFromCart} 
                        />})
                        : <p>No Data To Display</p>   
                }
                </div>
            }
        </div>
    );
}

export default HomePage;

"use client"

import { createContext, useState, useEffect } from "react"

export const cartContext = createContext({})


export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState({});//1
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        try {
            if (localStorage.getItem('cart')) {
                setCartProducts(JSON.parse(localStorage.getItem('cart')))
                saveCart(JSON.parse(localStorage.getItem('cart')))
            }
        }
        catch (error) {
            console.error(error);
            localStorage.clear()
        }
    }, [])

    const addToCart = async (itemId, price, name,) => {
        // const obj = { i1: { qty: 1, price: 110, name: Pizza }, i2: {}, i3: {} }
        let newCartProducts = cartProducts
        if (itemId in cartProducts) {
            newCartProducts[itemId].qty += 1
        }
        else {
            newCartProducts[itemId] = { qty: 1, price, name }
        }
        setCartProducts(newCartProducts)
        saveCart(newCartProducts)
    }

    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart))
        let subt = 0;
        let keys = Object.keys(myCart)
        for (let i = 0; i < keys.length; i++) {
            subt += myCart[keys[i]].price * myCart[keys[i]].qty
        }
        setSubTotal(subt)
    }

    const removeFromCart = (itemId) => {
        let newCartProducts = cartProducts
        console.log(cartProducts[itemId]);
        if (itemId in cartProducts) {
            newCartProducts[itemId].qty = cartProducts[itemId].qty - 1
        }
        if (newCartProducts[itemId].qty <= 0) {
            delete newCartProducts[itemId]
        }
        setCartProducts(newCartProducts)
        saveCart(newCartProducts)
    }

    const clearCart = () => {
        setCartProducts({})
        saveCart({})
    }

    return (
        <cartContext.Provider value={{ cartProducts, addToCart, removeFromCart, clearCart, subTotal }} >
            {children}
        </cartContext.Provider >
    )
}
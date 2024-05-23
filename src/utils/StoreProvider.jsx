import React from "react";
import {useState} from "react";
import ProductContext from "../contexts/ProductContext";

const StoreProvider = ({children}) => {
    const [products,setProducts] = useState([]);

    return (
        <ProductContext.Provider value={{products,setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}

export default StoreProvider;
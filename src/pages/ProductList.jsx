import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {type} from "./ProductAdd";
import {
    ButtonsWrapper,
    CustomButton,
    HeaderContainer,
    MainContainer,
    ProductContainer,
    ProductListContainer
} from "../components";
import ProductContext from "../contexts/ProductContext";
import { baseURL } from "../utils/ajax";

let isFetched = false;

const ProductList = ()=> {
    const navigate = useNavigate();
    const [selectedSkus,setSelectedSkus] = useState([]);
    const {products,setProducts} = useContext(ProductContext);

    useEffect(()=> {
        const getData = async ()=> {
            if(!isFetched) {
                const response = await fetch(baseURL, {
                    method: 'GET',
                });
                const data = await response.json();
                setProducts(data);
                isFetched = true;
            }
        }

        getData().catch(err=>console.log(err));
    },[setProducts])

    const handleDelete = async () => {
        if (selectedSkus.length === 0) return;

        fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify(selectedSkus)
        }).then((res)=> {
            console.log('AAAAA', res);
            setProducts(products.filter(product => !selectedSkus.includes(product.sku)));
            setSelectedSkus([]);
        }).catch((err)=>{
            console.log(err);
        })
    };

    const handleChange = (e,sku) => {
        const {checked} = e.target;
        if(checked === true) {
            setSelectedSkus([...selectedSkus,sku]);
        } else {
            setSelectedSkus(selectedSkus.filter(id=>id !== sku));
        }
    }

    return (
        <MainContainer>
            <HeaderContainer>
                <h1>Product List</h1>
                <ButtonsWrapper>
                    <CustomButton id="add" className="add" onClick={()=>navigate('/addproduct')}>ADD</CustomButton>
                    <CustomButton id="massdelete" className="delete-checkbox" disabled={selectedSkus.length === 0} onClick={handleDelete} id="delete-product-btn">MASS DELETE</CustomButton>
                </ButtonsWrapper>
            </HeaderContainer>
            <ProductListContainer>
                {
                    products.map(product => (
                        <ProductContainer key={product.sku}>
                            <input className='delete-checkbox' name='selected' type='checkbox' checked={selectedSkus.includes(product.sku)} onChange={e=>handleChange(e,product.sku)} />
                            <p>{product.sku}</p>
                            <p>{product.name}</p>
                            <p>{product.price} $</p>
                            {
                                product.type_name === type.dvd && <p>Size: {product.size}</p>
                            }
                            {
                                product.type_name === type.furniture && <p>Dimension: {product.height}x{product.length}x{product.width}</p>
                            }
                            {
                                product.type_name === type.book && <p>Weight: {product.weight}</p>
                            }
                        </ProductContainer>
                    ))
                }
            </ProductListContainer>
        </MainContainer>
    )
}

export default ProductList;
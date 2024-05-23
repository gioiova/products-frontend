import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import {CustomButton, CustomInput, ErrorMessage, FormContainer, HeaderContainer, MainContainer} from "../components";
import ButtonsWrapper from "../components/styled/ButtonsWrapper";
import ProductContext from "../contexts/ProductContext";
import ajax from "../utils/ajax";

export const type = {
    dvd:"DVD",
    furniture:"Furniture",
    book:"Book"
}

const initialValue = {
    sku:'',
    name:'',
    price:'',
    size:'',
    height:'',
    width:'',
    length:'',
    weight:'',
    type:type.dvd
}

const ProductAdd = ()=> {
    const [product,setProduct] = useState(initialValue);
    const [selected,setSelected] = useState(initialValue.type);
    const [error,setError] = useState('');
    const {products,setProducts} = useContext(ProductContext);
    const navigate = useNavigate();

    const handleChange = e => {
        const {name,value} = e.target;

        setProduct({
            ...product,
            [name]:value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        ajax.post('product/save',product)
            .then(res=> {
                if(res.status === 200) {
                    setProducts([...products,product]);
                    setProduct(initialValue);
                    navigate('/');
                }else {
                    console.log(res);
                }
            }).catch(err=> {
                if (err.response.status === 409) {
                    setError(err.response.data);
                } else {
                    console.log(err.response);
                }
        });
    }

    const handleCancel = ()=> {
        setProduct(initialValue);
        navigate('/');
    }

    return (
        <MainContainer>
            <HeaderContainer>
                <h1>Product Add</h1>
                <ButtonsWrapper>
                    <CustomButton form='product_form' type='submit'>Save</CustomButton>
                    <CustomButton onClick={handleCancel}>CANCEL</CustomButton>
                </ButtonsWrapper>
            </HeaderContainer>
            <FormContainer id='product_form' onSubmit={handleSubmit}>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <label htmlFor='sku'>
                    SKU
                </label>
                <CustomInput type='text' id='sku' name='sku' onChange={handleChange} value={product.sku} />
                <label htmlFor='name'>
                    Name
                </label>
                <CustomInput type='text' name='name' id='name' onChange={handleChange} value={product.name} />
                <label htmlFor='price'>
                    Price ($)
                </label>
                <CustomInput type='number' name='price' id='price' onChange={handleChange} value={product.price} />
                <select id='productType' value={selected} onChange={e => {
                    const {value} = e.target;
                    setSelected(value);
                    setProduct({...product,type: value});
                }}>
                    <option value={type.dvd}>{type.dvd}</option>
                    <option value={type.furniture}>{type.furniture}</option>
                    <option value={type.book}>{type.book}</option>
                </select>
                {
                    selected === type.book &&
                    (
                        <>
                            <label htmlFor='weight'>
                                Weight (KG)
                            </label>
                            <CustomInput type='number' id='weight' name='weight' onChange={handleChange} value={product.weight} />
                        </>
                    )
                }
                {
                    selected === type.furniture &&
                    (
                        <>
                            <label htmlFor='height'>
                                Height (CM)
                            </label>
                            <CustomInput type='number' id='height' name='height' onChange={handleChange} value={product.height} />
                            <label htmlFor='width'>
                                Width (CM)
                            </label>
                            <CustomInput type='number' id='width' name='width' onChange={handleChange} value={product.width} />
                            <label htmlFor='length'>
                                Length (CM)
                            </label>
                            <CustomInput type='number' id='length' name='length' onChange={handleChange} value={product.length} />
                        </>
                    )
                }
                {
                    selected === type.dvd &&
                    (
                        <>
                            <label htmlFor='size'>
                                Size (MB)
                            </label>
                            <CustomInput type='number' id='size' name='size' onChange={handleChange} value={product.size} />
                        </>
                    )
                }
            </FormContainer>
        </MainContainer>
    )
}

export default ProductAdd;
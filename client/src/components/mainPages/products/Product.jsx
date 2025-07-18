import "./Products.css"
import React, { useContext } from 'react'
import globalState from '../../../context/globalState'
import ProductList from '../../../utils/ProductList/ProductList'

const Product = () => {
  const state = useContext(globalState)
  const [products] = state.ProductAPI.products
  return (
    <div className='products'>
      {products.map(product => (
        <ProductList key={product._id} product={product}/>
      ))}
    </div>
  )
}

export default Product
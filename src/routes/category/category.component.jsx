import { useContext, useState, useEffect, Fragment } from "react"
import { useParams } from "react-router-dom";
import {CollectionContext} from "../../contexts/collection.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";

const Category =()=>{
const {category}= useParams();
const {collections}= useContext(CollectionContext);
const[products,setProducts]= useState(collections[category]);
useEffect(()=>{
    setProducts(collections[category])
},[category, collections])
    return(
        <Fragment>
             <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className="category-container">
                {
                    products && products.map((product)=> (
                    <ProductCard key={product.id} product={product} />
                ))
                }
            </div>
        </Fragment>
    )
}

export default Category
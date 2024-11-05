import { useContext, Fragment } from "react";
import { CollectionContext } from "../../contexts/collection.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview=()=>{
const {collections} = useContext(CollectionContext);
    return(
        <Fragment>
           {
             Object.keys(collections).map((title)=>{
                const products = collections[title];
                return(
                    <CategoryPreview key={title} title={title} products={products}></CategoryPreview>
                )
                })
           }
        </Fragment>
       

    )
}

export default CategoriesPreview;
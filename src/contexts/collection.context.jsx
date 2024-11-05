import SHOP_DATA from "../shop-data.js";
import { createContext, useState, useEffect } from "react";
import { getCategories} from '../utils/firebase/firebase.utils.js';
export const CollectionContext = createContext({
    collections:{}
});

export const CollectionProvider = ({children})=>{
    const [collections, setCollections]= useState({});
    const value = {collections};
    useEffect(()=>{
       const getcollections = async()=>{
            const getcollectionall = await getCategories();
            setCollections(getcollectionall)
       }
       getcollections();
    },[])
    return(
        <CollectionContext.Provider value={value}> {children} </CollectionContext.Provider>
    )
}
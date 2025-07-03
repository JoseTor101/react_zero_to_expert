//import '../styles.css'
import { useState } from 'react'
import { AddCategories, GifGrid } from '.';


export const GifExpertApp = () => {

    const [categories, setCategories] = useState(['One Punch']);

    const onAddCategory = (value) =>{
        if(categories.includes(value)) return;
        setCategories([value, ...categories]);
    }

    return(
        <>
            <h1>GitExpert App</h1>

            <AddCategories onAddCategory={onAddCategory}/>
            
            {
                categories.map((category, _) => (
                   <GifGrid category={category} index={_} key={category}/>
                ))
            }
            
        </>
    )
}
import { useState, useEffect } from "react";
import {getGifs} from '../helpers/getGifs'
import React from 'react'

const useFetchGifs = (category) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchGifs = async () => {
        const gifs = await getGifs(category);
        setImages(gifs);
        setIsLoading(false);
      };
    
      useEffect(() => {
        fetchGifs();
      }, [category]);

    return {
        images: images,
        isLoading: isLoading,
    }

}

export default useFetchGifs;

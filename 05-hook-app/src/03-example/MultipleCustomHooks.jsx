import React from 'react'
import useFetch from '../hooks/useFetch2'


const MultipleCustomHooks = () => {
    const { data, error } = useFetch("Poliwhirl");
    const imageUrl = data?.cards?.[0]?.imageUrl;

  return (
    <div>
        {imageUrl && <img src={imageUrl} alt="Pokemon" />}
        { error && <p className="text-danger">{error.code}:{error.message}</p>}
    </div>
  )
}

export default MultipleCustomHooks

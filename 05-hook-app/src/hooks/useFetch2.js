import { useState, useEffect } from "react";

const apiUrl = (cardName) =>
  `https://api.pokemontcg.io/v1/cards?name=${cardName}&pageSize=1`;

const useFetch = (pkmName = "charizard") => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
    error: null,
  });

  const { data, isLoading, hasError } = state;

  const getFetch = async () => {
    const resp = await fetch(apiUrl(pkmName));
    if (!resp.ok) {
        setState({
            data: null,
            isLoading: true,
            hasError: null,
            error: {
                code: resp.status,
                message: resp.statusText
            },
        })
        return;
    }
    const data = await resp.json();
    console.log(data)

    setState({
        data: data,
        isLoading: true,
        hasError: null,
        error: null
    })
  };

  useEffect(() => {
    getFetch();
  }, []);

  return {
    data: data,
    isLoading: isLoading,
    hasError: hasError,
  };
};

export default useFetch;

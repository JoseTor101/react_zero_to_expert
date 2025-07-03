import PropTypes from "prop-types";
import { useState } from "react";

export const AddCategories = ({onAddCategory}) => {
    const [inputValue, setInputValue] = useState('One Punch');

    const onInputChange = ({target}) =>{
        setInputValue(target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputValue.trim().length < 1 ) return;
        onAddCategory(inputValue);
        setInputValue('');
    }

    return(
        <form onSubmit={handleSubmit} aria-label="form">
            <input 
                    type="text" 
                    id="categoryName"
                    placeholder="Buscar GIFs"
                    onChange={onInputChange}
                    value={inputValue}
                    required
                    >
                    </input>
        </form>
    )
} 


AddCategories.propTypes = {
    onAddCategory: PropTypes.func.isRequired
}

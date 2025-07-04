import moment from 'moment'

const isDate = ( value ) => {

    if ( value === undefined || value === null ) {
        return false;
    }

    // Si es un número (timestamp), convertirlo a entero
    if (typeof value === 'number' || (typeof value === 'string' && !isNaN(value))) {
        value = parseInt(value);
    }

    const fecha = moment( value );
    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
    
}


export {isDate}
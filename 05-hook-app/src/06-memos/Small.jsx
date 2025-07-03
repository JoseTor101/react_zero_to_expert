import React from 'react'

const Small = ({value}) => {

    console.log("I was rendered");
  return (
    <small>
        {value}
    </small>
  )
}

export default React.memo(Small)

import React from "react";
import PropTypes from "prop-types";

const GifItem = ({ title, url }) => {
  return (
    <div className="card">
      <img src={url} alt={title}></img>
      <p>{title}</p>
    </div>
  );
};

GifItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};



export default GifItem;

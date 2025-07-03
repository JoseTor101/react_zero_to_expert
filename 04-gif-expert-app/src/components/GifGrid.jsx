import PropTypes from "prop-types";
import GifItem from "./GifItem";
import useFetchGifs from "../hooks/useFetchGifs";

export const GifGrid = ({ category }) => {

  const {images, isLoading} = useFetchGifs(category);


  return (
    <>
      <h3>{category}</h3>
      <div className="card-grid">

        {
            isLoading ?
            <p aria-label="loading">Cargando...</p>
            :
            (images.map((image) => (
              <GifItem key={image.id} title={image.title} url={image.url} />
            )))
        }

      </div>
    </>
  );
};

GifGrid.propTypes = {
  category: PropTypes.string.isRequired,
};

GifGrid.defaultPropTypes = {
  category: "One Punch",
};

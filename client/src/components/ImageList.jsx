import React from 'react';
import ImageCard from './ImageCard';

const ImageList = (props) => {
  const images = props.images.map((img) => (
    <ImageCard
      deleteScreenshot={props.deleteScreenshot}
      key={img.id}
      image={img}
    />
  ));
  return <div className="ui cards">{images}</div>;
};

export default ImageList;

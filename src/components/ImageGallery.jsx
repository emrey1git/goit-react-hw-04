import ImageCard from "./ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul>
      {images.map((img) => (
        <ImageCard key={img.id} image={img} onClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;

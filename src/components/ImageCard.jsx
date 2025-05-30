const ImageCard = ({ image, onClick }) => {
  return (
    <li onClick={() => onClick(image)}>
      <img src={image.urls.small} alt={image.alt_description} />
    </li>
  );
};

export default ImageCard;

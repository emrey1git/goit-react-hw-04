import Modal from "react-modal";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 1000,
          overflow: "hidden", // scroll'u kaldırmak için overlay overflow hidden
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: 0,
          border: "none",
          background: "transparent",
          overflow: "hidden",
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: "8px",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </Modal>
  );
};

export default ImageModal;

import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ImageModal from "./components/ImageModal";
import Loader from "./components/Loader"; 
import toast, { Toaster } from "react-hot-toast"; 

const ACCESS_KEY = "mZ-PGpbO-m46PTDt4FkEMWLL8xWIwSjkx-D0tLCLJuQ";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (searchTerm, pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: searchTerm,
            page: pageNum,
            per_page: 12,
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );
      return response.data.results;
    } catch (err) {
      console.error(err);
      setError("Görseller yüklenirken hata oluştu.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      const newImages = await fetchImages(query, page);
      if (page === 1) {
        setImages(newImages);
      } else {
        setImages((prev) => [...prev, ...newImages]);
      }
    };

    loadImages();
  }, [query, page]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleSearchSubmit = (searchTerm) => {
    if (searchTerm.trim() === "") {
      toast.error("Lütfen arama için bir kelime girin.");
      return;
    }
    setQuery(searchTerm);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <Toaster position="top-right" /> {/* Toast bildirimleri */}
      <SearchBar onSubmit={handleSearchSubmit} />

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {images.map((img) => (
          <li key={img.id} style={{ flexBasis: "30%", cursor: "pointer" }}>
            <img
              src={img.urls.small}
              alt={img.alt_description || "Image"}
              style={{ width: "100%", borderRadius: "8px" }}
              onClick={() => openModal(img)}
            />
          </li>
        ))}
      </ul>

      {loading && <Loader />} {/* Burada artık Loader bileşeni kullanılıyor */}

      {images.length > 0 && !loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={loadMore}>Daha Fazla Yükle</button>
        </div>
      )}

      <ImageModal isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />
    </div>
  );
};

export default App;

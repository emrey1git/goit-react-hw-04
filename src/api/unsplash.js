import axios from "axios";

const ACCESS_KEY = "mZ-PGpbO-m46PTDt4FkEMWLL8xWIwSjkx-D0tLCLJuQ"; // kendi anahtarın

const api = axios.create({
  baseURL: "https://api.unsplash.com",
  params: {
    client_id: ACCESS_KEY,
    per_page: 12,
  },
});

export const fetchImages = async (query, page) => {
  const response = await api.get("/search/photos", {
    params: { query, page },
  });
  return response.data;
};

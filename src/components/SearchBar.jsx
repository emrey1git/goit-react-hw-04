import { useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <header style={{ textAlign: "center", marginBottom: "20px" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search images and photos"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "10px", width: "300px", fontSize: "16px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;

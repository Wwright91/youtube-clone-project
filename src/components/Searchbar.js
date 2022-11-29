import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");
  const [maxResults, setMaxResults] = useState("");

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${inputValue}/${maxResults}`);
    setInputValue("");
    setMaxResults("");
  }

  // console.log(maxResults);

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="max-results">Max Results</label>
        <select
          id="max-results"
          onChange={(e) => setMaxResults(e.target.value)}
        >
          <option value="24"></option>
          <option value="5">5</option>
          <option value="15">15</option>
          <option value="50">50</option>
        </select>
        <input
          type="text"
          value={inputValue}
          placeholder="Search"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          required
        ></input>
        <button id="magnifying-glass">&#x1F50D;</button>
      </form>
    </div>
  );
};

export default Searchbar;

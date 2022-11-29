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

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="select-wrap">
          <label>Max Results</label>

          <select
            name="max-results"
            onChange={(e) => setMaxResults(e.target.value)}
          >
            <option value="22">Default</option>
            <option value="5">5</option>
            <option value="15">15</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* <div class="select-wrap">
          <label>Color</label>
          <select name="color" style="width: 100%;">
            <option value="">---</option>
            <option value="yellow">Yellow</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
        </div> */}

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

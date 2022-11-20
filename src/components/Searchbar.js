import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${inputValue}`);
    setInputValue("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          required
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default Searchbar;

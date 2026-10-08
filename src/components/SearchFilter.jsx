import "../../App.scss"
import { useState } from "react";
function SearchFilter() {
  const [inputValue, setInputValue] = useState("");
  const searchHandler = ()=> {
    const data = JSON.parse(localStorage.getItem("DATA"));
    console.log("get data from local storage", data);
    console.log(inputValue);

    const result = data.filter((student) =>
      student.name.toLowerCase().includes(inputValue.toLowerCase())
);
    console.log(result)
    localStorage.setItem(("filtereddata"),JSON.stringify(result))
    console.log("search result", result);
  };

  return (
    <div className="search-container">
      <div className="input-box">
        <span>🔍</span>

        <input
          required
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter Student Name"
        />
      </div>

      <button onClick={searchHandler} className="search-button" type="button">
        Search
      </button>
    </div>
  );
}

export default SearchFilter;

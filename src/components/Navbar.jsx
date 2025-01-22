import React, { useState } from "react";
import "../styles/Navbar.css";

function Navbar({ setIsFilterOpenNow, setSelectedPrice, setSelectedCategory }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleFilterChange = () => {
    setIsChecked((prev) => {
      const newChecked = !prev;
      setIsFilterOpenNow(newChecked);
      return newChecked;
    });
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClearAll = () => {
    setIsChecked(false);
    setIsFilterOpenNow(false);
    setSelectedPrice("");
    setSelectedCategory("");
  };

  return (
    <nav>
      <p>Filter By :</p>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleFilterChange}
        />
        OPEN NOW
      </label>

      <label>
        <span>Price:</span>
        <select className="opsi" onChange={handlePriceChange}>
          <option value="">All</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
        </select>
      </label>

      <label>
        <span>Category:</span>
        <select className="opsi" onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="THAI">THAI</option>
          <option value="SEAFOOD">SEAFOOD</option>
          <option value="JAPANESE">JAPANESE</option>
          <option value="ITALIAN">ITALIAN</option>
          <option value="AMERICAN">AMERICAN</option>
          <option value="MEXICAN">MEXICAN</option>
          <option value="STEAKHOUSES">STEAKHOUSES</option>
        </select>
      </label>

      <button className="clr" onClick={handleClearAll}>
        CLEAR ALL
      </button>
    </nav>
  );
}

export default Navbar;

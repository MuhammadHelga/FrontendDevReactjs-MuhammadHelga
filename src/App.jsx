import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import './App.css';
import RestaurantCard from "./components/RestoCard";
import Navbar from "./components/Navbar";
import DetailPage from "./pages/detail.jsx";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isFilterOpenNow, setIsFilterOpenNow] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("https://678f466d49875e5a1a9129d9.mockapi.io/api/v1/resto")
      .then((response) => {
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    let updatedRestaurants = restaurants;

    if (isFilterOpenNow) {
      updatedRestaurants = updatedRestaurants.filter(
        (restaurant) => restaurant.status === "OPEN"
      );
    }

    if (selectedPrice) {
      updatedRestaurants = updatedRestaurants.filter(
        (restaurant) => restaurant.harga === selectedPrice
      );
    }

    if (selectedCategory) {
      updatedRestaurants = updatedRestaurants.filter(
        (restaurant) => restaurant.kategori === selectedCategory
      );
    }

    setFilteredRestaurants(updatedRestaurants);
  }, [isFilterOpenNow, selectedPrice, selectedCategory, restaurants]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Restaurants</h1>
              <p className="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Navbar
                setIsFilterOpenNow={setIsFilterOpenNow}
                setSelectedPrice={setSelectedPrice}
                setSelectedCategory={setSelectedCategory}
              />
              <div className="resto-grid">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
              <div className="btn">
                <button>
                  LEARN MORE
                </button>
              </div>
            </div>
          }
        />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;

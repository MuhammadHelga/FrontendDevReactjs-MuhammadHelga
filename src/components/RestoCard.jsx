import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/RestoCard.css';
import { FaCircle } from "react-icons/fa";

const RestoCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>&#9733;</span>
      );
    }
    return stars;
  };

  return (
    <div className="resto-card">
      <div className="image-placeholder">
        <img
          src={restaurant.gambar}
          className="resto-image"
          alt={restaurant.nama}
        />
      </div>
      <h2>{restaurant.nama}</h2>
      <div className="rating">
        {renderStars(restaurant.rating)}
      </div>
      <div className="info-container">
        <p className="details">{restaurant.kategori} - {restaurant.harga}</p>
        <div className="status-container">
          <FaCircle className={`ball-status ${restaurant.status === "OPEN" ? "open" : "closed"}`} />
          <p className={`status ${restaurant.status === "OPEN" ? "open" : "closed"}`}>
            {restaurant.status === "OPEN" ? "OPEN NOW" : "CLOSED"}
          </p>
        </div>
      </div>
      <button onClick={() => navigate(`/detail/${restaurant.id}`)}>LEARN MORE</button>
    </div>
  );
};

export default RestoCard;

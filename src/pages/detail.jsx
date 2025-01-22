import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/detail.css";

const Detail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://678f466d49875e5a1a9129d9.mockapi.io/api/v1/resto/${id}`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => console.error("Error fetching restaurant:", error));

    axios
      .get(`https://678f466d49875e5a1a9129d9.mockapi.io/api/v1/resto/${id}/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? "filled" : ""}`}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  if (!restaurant || !reviews) return null;

  return (
    <div className="detail-page">
      <h1>{restaurant.nama}</h1>
      <p>Rating: {renderStars(restaurant.rating)}</p>

      <h2>Reviews</h2>
      <div className="reviews">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-image-placeholder"></div>
            <h3>{review.nama}</h3>
            <p>Rating: {renderStars(review.rating)}</p>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;

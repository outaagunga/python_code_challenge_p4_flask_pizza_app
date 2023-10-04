import React, { useEffect } from "react";
import { useMyContext } from "../MyContext";

const Body = () => {
  const { restaurants, fetchRestaurants } = useMyContext(); // Updated hook usage and added fetchRestaurants function

  useEffect(() => {
    // Fetch the list of restaurants from your API
    fetch("/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurantsData(data)); // Use setRestaurantsData from context to update the data
  }, []);

  return (
    <div>
      <h1>Pizza Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Body;

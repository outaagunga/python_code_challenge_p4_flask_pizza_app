import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMyContext } from "../MyContext"; // Import the context hook

function RestaurantDetails() {
  const { id } = useParams();
  const { setRestaurant } = useMyContext(); // Access setRestaurant from the context
  const { restaurant: selectedRestaurant } = useMyContext();

  useEffect(() => {
    // Fetch restaurant details by ID from  API
    fetch(`/restaurants/${id}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Restaurant not found");
        }
        return response.json();
      })
      .then((data) => setRestaurant(data)) // Use setRestaurant from context to update the data
      .catch((error) => console.error(error));
  }, [id]);

  if (!selectedRestaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{selectedRestaurant.name}</h2>
      <p>{selectedRestaurant.address}</p>
      <h3>Pizzas</h3>
      <ul>
        {selectedRestaurant.pizzas.map((pizza) => (
          <li key={pizza.id}>
            {pizza.name} - {pizza.ingredients}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantDetails;

import React, { useState } from "react";
import { useMyContext } from "../MyContext"; // Import the context hook

function AddPizzaForm() {
  const [formData, setFormData] = useState({
    price: 0,
    pizza_id: 0,
    restaurant_id: 0,
  });

  const { setPizzas } = useMyContext(); // Access setPizzas from the context

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send a POST request to create a new RestaurantPizza with formData
    fetch("/restaurant_pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or validation errors
        if (data.errors) {
          console.error(data.errors);
        } else {
          console.log("Pizza created:", data);
          setPizzas(data); // Use setPizzas from context to update the data
          // Reset the form or navigate to a success page
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Add Pizza to Restaurant</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div>
          <button type="submit">Add Pizza</button>
        </div>
      </form>
    </div>
  );
}

export default AddPizzaForm;

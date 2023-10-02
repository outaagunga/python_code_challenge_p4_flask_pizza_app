import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const MyContext = createContext();

// Custom hook for using the context
export const useMyContext = () => useContext(MyContext);

const MyContextProvider = ({ children }) => {
  // State variables
  const [loginStatus, setLoginStatus] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCounter, setCartCounter] = useState(0);
  const [pizzas, setPizzas] = useState([]);

  // Effect to fetch restaurants when component mounts
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Update login status
  const updateLoginStatus = (newState) => {
    setLoginStatus(newState);
  };

  // Update theme (dark mode)
  const updateTheme = (newState) => {
    setDarkMode(newState);
  };

  // Update popup state
  const updatePopUpState = (newState) => {
    setPopUp(newState);
  };

  // Close the cart popup
  const closeTheCart = () => {
    updatePopUpState(false);
  };

  // Update search term
  const updateSearchTerm = (newState) => {
    setSearchTerm(newState);
  };

  // Set restaurants
  const setRestaurantsData = (newState) => {
    setRestaurants(newState);
  };

  // Set cart counter
  const setCartCounterData = (newState) => {
    setCartCounter(newState);
  };

  // Fetch restaurants from the API
  const fetchRestaurants = () => {
    fetch("http://your-api-url.com/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurantsData(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  };

  // Context value
  const contextValue = {
    loginStatus,
    updateLoginStatus,
    darkMode,
    updateTheme,
    popUp,
    updatePopUpState,
    closeTheCart,
    searchTerm,
    updateSearchTerm,
    restaurants,
    setRestaurants: setRestaurantsData,
    cartCounter,
    setCartCounter: setCartCounterData,
    pizzas, // Include pizzas in the context
    setPizzas, // Function to set pizzas
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyContextProvider;

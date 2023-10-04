import React from "react";
import MyContext from "./MyContext";
import "./App.css";
import Header from "./components/Header";
import AddPizzaForm from "./components/AddPizzaForm";
import RestaurantDetails from "./components/RestaurantDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <MyContext>
      {" "}
      <div>
        <Header />
        <AddPizzaForm />
        <RestaurantDetails />
        <Footer />
      </div>
    </MyContext>
  );
}

export default App;

import React from "react";
import MyContext from "./MyContext";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <MyContext>
      {" "}
      <div>
        <Header />
        <Footer />
      </div>
    </MyContext>
  );
}

export default App;

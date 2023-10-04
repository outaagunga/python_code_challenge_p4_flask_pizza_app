import React, { useEffect, useState } from "react";
import "../css/Header.css";
import { useMyContext } from "../MyContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { darkMode } = useMyContext();

  // Use useEffect to add an event listener to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`general-container`} id={isScrolled ? "shrink" : ""}>
      <div className={`head-container ${darkMode ? "activate-dark" : ""}`}>
        <p className={`logo ${darkMode ? "logo-dark" : ""}`}>
          Pizza Restaurants
        </p>
        <ul className="head-lists">
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="second">
        <div className="welcome-message">
          Welcome to Jeco Pizza Restaurant - Where Pizza Perfection Meets Your
          Palate!
        </div>
      </div>
    </div>
  );
};

export default Header;

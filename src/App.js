import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import BookCarForm from "./components/BookCarForm";
import HomePage from "./components/HomePage";
import Price from "./components/Price";
import Offers from "./components/Offers";
import Confirmed from "./components/Confirmed";

import "./styles/styles.css";

function App() {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [isPrice, setisPrice] = useState();
  const [isHome, setisHome] = useState(false);
  const [isOffers, setisOffers] = useState(false);

  const priceHandler = () => {
    setisPrice(true);
    setisHome(false);
    setOffers(false);
  };
  const homeHandler = () => {
    setisHome(true);
    setisPrice(false);
    setisOffers(false);
  };
  const offersHandler = () => {
    setisOffers(true);
    setisHome(false);
    setisPrice(false);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:4000/cars");
        const data = await res.json();
        console.log("data", data);
        setCars(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <>
      <header>
        <h1 className="header">BELKO RENTAL</h1>
        <>
          <button id="home">
            <Link to="/">HOME</Link>
          </button>

          <button id="booking">
            <Link to="/booking">booking</Link>
          </button>

          <button id="offers">
            <Link to="/offers">offers</Link>
          </button>

          <button id="prices">
            <Link to="/prices">prices</Link>
          </button>
        </>
      </header>
      <main>
        <Routes>
          <Route path="/booking" element={<BookCarForm cars={cars} />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/prices" element={<Price cars={cars} />} />
          <Route path="/confirmed" element={<Confirmed />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

/*
        <nav>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/booking">Booking</Link>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route
          path="/booking"
          element={<Confirmed />} 
        />
        <Route
          path="/"
          element={
            <BookCarForm
              setShowForm={setShowForm}
              setOffers={setOffers}
              setisHome={setisHome}
              setisPrice={setisPrice}
            />
          }
        />
      </Routes>
      */

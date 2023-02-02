import React, { useState } from "react";
import MovieList from "./components/Movie/MovieList";
import Navigation from "./components/Navigation/Navigation";
import Profil from "./components/Profil/Profil";
import "./index.css";

const App = () => {
  const [page, setPage] = useState("search");
  const [showNav, setShowNav] = useState(false);

  const navHandler = (arg) => {
    setPage(arg);
  };

  const openNavHandler = () => {
    setShowNav(true);
  };

  const closeNavHandler = () => {
    setShowNav(false);
  };

  return (
    <div>
      <Navigation
        onNavClick={navHandler}
        page={page}
        showNav={showNav}
        onCloseClick={closeNavHandler}
      />
      {page === "search" ? (
        <MovieList
          onBurgerClick={openNavHandler}
          onPageClick={closeNavHandler}
          showNav={showNav}
        />
      ) : (
        <Profil
          onBurgerClick={openNavHandler}
          onPageClick={closeNavHandler}
          showNav={showNav}
        />
      )}
    </div>
  );
};

export default App;

import React, { useState } from "react";
import classes from "./Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = (props) => {
  const [navigation, setNavigation] = useState("search");

  return (
    <nav
      className={`${classes.navigation} ${
        props.showNav ? classes.navActive : null
      }`}
    >
      <div>
        <FontAwesomeIcon
          icon="fa-times"
          className={classes.cross}
          onClick={props.onCloseClick}
        ></FontAwesomeIcon>
      </div>
      <ul>
        <li
          className={navigation === "search" ? classes.active : null}
          onClick={() => {
            props.onNavClick("search");
            setNavigation("search");
            props.onCloseClick();
          }}
        >
          Search
        </li>
        <li
          className={navigation === "profil" ? classes.active : null}
          onClick={() => {
            props.onNavClick("profil");
            setNavigation("profil");
            props.onCloseClick();
          }}
        >
          My movies
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

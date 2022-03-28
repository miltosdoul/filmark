import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import RegionSelector from "./RegionSelector";
import { GlobalContext } from "../context/GlobalState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon, faXmark } from "@fortawesome/free-solid-svg-icons";

const MobileNavbar = () => {
  const { region, regions, setActiveRegion } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [clickable, setClickable] = useState(true);

  const handleClick = () => {
    if (clickable) {
      setOpen(!open);
      setClickable(false);

      setTimeout(() => {
        setClickable(true);
      }, 500);
    }
  };

  const closeNavbar = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className={open ? "btn open navbar-toggle" : "btn navbar-toggle"}
        onClick={handleClick}
        aria-label="mobile-navbar-toggler"
      >
        <FontAwesomeIcon icon={open ? faXmark : faNavicon} />
      </button>
      <div
        className={open ? "click-catcher mobile open" : "click-catcher mobile"}
        onClick={handleClick}
      ></div>
      <nav className={open ? "mobile-nav open" : "mobile-nav"}>
        <div className="nav-content">
          <div className="mobile-nav__link" onClick={closeNavbar}>
            <Link to="/">home</Link>
          </div>
          <div className="mobile-nav__link" onClick={closeNavbar}>
            <Link to="/watchlist">watchlist</Link>
          </div>
          <div className="mobile-nav__link" onClick={closeNavbar}>
            <Link to="/watched">watched</Link>
          </div>
          <div className="mobile-nav__link" onClick={closeNavbar}>
            <Link to="/add" className="btn">
              + add
            </Link>
          </div>
          <div className="mobile-nav__link">
            <RegionSelector
              region={region}
              regionList={regions}
              setActiveRegion={setActiveRegion}
              mobile={true}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileNavbar;

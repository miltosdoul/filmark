import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RegionSelector from "./RegionSelector";
import { GlobalContext } from "../context/GlobalState";
import MobileNavbar from "./MobileNavbar";

const Header = () => {
  const { region, regions, setActiveRegion } = useContext(GlobalContext);
  const [windowWidth, setWidth] = useState(0);

  const updateDimensions = () => {
    let newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <header>
      <div className="container header-container">
        <div className="inner-content">
          <div className="logo">
            <Link to="/">
              film<span className="bg-gradient">a</span>rk
            </Link>
          </div>
          {windowWidth > 768 ? (
            <ul className="nav-links">
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
              <li>
                <Link to="/watched">Watched</Link>
              </li>
              <li>
                <Link to="/add" className="btn">
                  + Add
                </Link>
              </li>
              <li>
                <RegionSelector
                  region={region}
                  regionList={regions}
                  setActiveRegion={setActiveRegion}
                  mobile={false}
                />
              </li>
            </ul>
          ) : (
            <MobileNavbar />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

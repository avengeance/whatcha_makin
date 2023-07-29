import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "../../images/logo1.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navigation-container">
      <div className="justify-center">
        <div className="header">
          <ul>
            <div className="home-button">
              <li id="home-button">
                <NavLink exact to="/" className="logo-link">
                  <span
                    className="logo-image"
                    style={{
                      backgroundImage: `url(${logo})`,
                    }}
                  ></span>
                </NavLink>
              </li>
            </div>
            {isLoaded && (
              <div className="fix top-0 hover: shadow-lg">
                <li>
                  <ProfileButton user={sessionUser} />
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;

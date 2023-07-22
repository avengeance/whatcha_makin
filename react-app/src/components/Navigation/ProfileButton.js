import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const [showCreateButton, setShowCreateButton] = useState(false);

  const openMenu = () => {
    // if (showMenu) return;
    // setShowMenu(true);
    setShowMenu((prev) => !prev);
  };

  const toggleCreateButton = () => {
    setShowCreateButton((prev) => !prev);
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button
        onClick={openMenu}
        id="profile-button"
        style={{ backgroundColor: "#8ABE53" }}
      >
        {/* <i className='fas fa-bars' style={{
          fontSize: '14px',
          paddingRight: '12px',
          paddingLeft: '5px',
        }} /> */}
        <i
          className="fas fa-user-circle"
          style={{
            fontSize: "30px",
          }}
        />
      </button>
      {/* {user && (
      )} */}
      <ul className={ulClassName} ref={ulRef} id="profile-dropdown">
        {user ? (
          <>
            <li id="firstname">Hi, {user.first_name} welcome back!</li>
            <li id="email">{user.email}</li>
            <li>
              {/* <button
                onClick={toggleCreateButton}
                id="create-recipe-button"
                style={{ backgroundColor: "transparent" }}
              > */}
              <NavLink
                exact
                to="/recipes/new"
                id="recipe-button-link"
                onClick={toggleCreateButton}
              >
                Create New Recipe
              </NavLink>
              {/* </button> */}
            </li>
            <li id="manage-recipes">
              <NavLink
                to={`/users/${user.id}/recipes`}
                id="manage-recipes-link"
                style={{ textDecoration: "none" }}
              >
                Manage Recipes
              </NavLink>
            </li>
            <li id="li-logout">
              <button
                onClick={handleLogout}
                id="logout-button"
                // className="rounded-full"
              >
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <div className="login-button">
              <OpenModalButton
                className="modal-button"
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="signup-button">
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;

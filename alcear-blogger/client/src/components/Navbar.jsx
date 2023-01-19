import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo2 from "../img/logo-desktop.png";
import { useState } from "react";
import LogoMobileHeader from "../img/logo-header.svg";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [active, setMode] = useState(false);
  const ToggleMode = () => {
    setMode(!active);
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo2} alt="" />
          </Link>
        </div>

        <div className="container-mobile">
          <img className="logo-mobile" src={LogoMobileHeader} alt="" />
          <div
            className={active ? "icon iconActive" : "icon"}
            onClick={ToggleMode}
          >
            <div className="hamburguer hamburguerIcon"></div>
          </div>

          <div className={active ? "menu menuOpen" : "menu menuClose"}>
            <div className="links-mobile">
              <Link className="link" to="/?cat=mideaSociais">
                <h6>Mideas Sociais</h6>
              </Link>
              <Link className="link" to="/?cat=trafegoPago">
                <h6>Tráfego Pago</h6>
              </Link>
              <Link className="link" to="/?cat=tecnologia">
                <h6>Tecnologia</h6>
              </Link>
              <Link className="link" to="/?cat=branding">
                <h6>Branding</h6>
              </Link>

              <span>{currentUser?.username}</span>
              {currentUser ? (
                <span onClick={logout}>Logout</span>
              ) : (
                <Link className="link" to="/login">
                  Login
                </Link>
              )}
              <span className="write">
                <Link className="link" to="/write">
                  Write
                </Link>
              </span>
            </div>
          </div>
        </div>

        <div className="links">
          <Link className="link" to="/?cat=mideaSociais">
            <h6>Mideas Sociais</h6>
          </Link>
          <Link className="link" to="/?cat=trafegoPago">
            <h6>Tráfego Pago</h6>
          </Link>
          <Link className="link" to="/?cat=tecnologia">
            <h6>Tecnologia</h6>
          </Link>
          <Link className="link" to="/?cat=branding">
            <h6>Branding</h6>
          </Link>

          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

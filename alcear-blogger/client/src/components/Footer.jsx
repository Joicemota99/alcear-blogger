import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        Feito com ♥️ da sua <b>Agência Alcear</b>.
      </span>
    </footer>
  );
};

export default Footer;

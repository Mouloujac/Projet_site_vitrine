import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import "./styles/Header.css";

const Header = ({ user, logout }) => {
  const handleLinkClick = () => {
    const hamburgerCheckbox = document.getElementById("hamburger-input");
    if (hamburgerCheckbox.checked) {
      hamburgerCheckbox.checked = false;
    }
  };


  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      const mainMenu = document.getElementById("main-menu");
      if (mainMenu) {
        if (isScrollingUp || currentScrollPos === 0) {
          mainMenu.classList.add("navbar-hidden");
          mainMenu.classList.remove("navbar-stick");  
        } else {
          mainMenu.classList.remove("navbar-hidden");
          mainMenu.classList.add("navbar-stick");
        }
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <input type="checkbox" id="hamburger-input" className="burger-shower" />

      <label htmlFor="hamburger-input" id="hamburger-menu">
        <nav id="sidebar-menu">
          <div id="logoSidebarDiv">
        <img src="/J.png" id="logoJSidebar"/>
        </div>
          <br />
          <ul>
            <li>
              <Link to="/" className="nav-link" onClick={handleLinkClick}>
                Accueil
              </Link>
            </li>
            <li className="headerLink">
              <Link to="/panier" className="nav-link" onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
            {user && Object.keys(user).length > 0 ? (
              <>
                <li className="headerLink">
                  <Link
                    to="/panier"
                    className="nav-link"
                    onClick={handleLinkClick}
                  >
                    Panier
                  </Link>
                </li>
                <li className="headerLink">
                  <Link
                    to="/account"
                    className="nav-link"
                    onClick={handleLinkClick}
                  >
                    Mon compte
                  </Link>
                </li>
                <li className="headerLink">
                  <Link
                    to="/login"
                    className="nav-link"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Déconnexion
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="headerLink">
                  <Link
                    to="/panier"
                    className="nav-link"
                    onClick={handleLinkClick}
                  >
                    Panier
                  </Link>
                </li>
                <li className="headerLink">
                  <Link
                    to="/login"
                    className="nav-link"
                    onClick={handleLinkClick}
                  >
                    Connexion
                  </Link>
                </li>
                <li className="headerLink">
                  <Link
                    to="/inscription"
                    className="nav-link"
                    onClick={handleLinkClick}
                  >
                    Inscription
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </label>
      <div className="overlay"></div>

          {/* Menu en taille d'ecran "desktop" __________________________________*/}


      <nav id="main-menu" className="navbar">
        <ul>
          {user && Object.keys(user).length > 0 ? (
            <>
              <div className="logoDiv"><img src="/J.png" id="logoJ"/></div>
              <div className="NavLink">
                <li>
                  <Link to="/" className="nav-link">
                    Accueil
                  </Link>
                </li>
                <li className="headerLink">
                  <Link to="/panier" className="nav-link">
                    Contact
                  </Link>
                </li>
                <li className="headerLink">
                  <Link to="/panier" className="nav-link">
                    Panier
                  </Link>
                </li>
              </div>
              <div id="navLog">
                <div className="dropdown">
                  <img
                    id="imgCompte"
                    src="/compte.png"
                    alt="Compte"
                    
                  />
                  <div className="dropdown-content" id="dropdownMenu">
                  <Link to="/account" className="nav-link">
                    Mon compte
                  </Link>
                
                  <Link
                    to="/login"
                    className="nav-link"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Déconnexion
                  </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="logoDiv"><img src="/J.png" id="logoJ"/></div>
              <div className="NavLink">
                <li>
                  <Link to="/" className="nav-link">
                    Accueil
                  </Link>
                </li>
                <li className="headerLink">
                  <Link to="/panier" className="nav-link">
                    Contact
                  </Link>
                </li>
                <li className="headerLink">
                  <Link to="/panier" className="nav-link">
                    Panier
                  </Link>
                </li>
              </div>
              <div id="navLog">
                <li className="log" id="login">
                  <Link to="/login" className="nav-link">
                    Connexion
                  </Link>
                </li>
                <li className="log" id="signIn">
                  <Link to="/inscription" className="nav-link">
                    Inscription
                  </Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;

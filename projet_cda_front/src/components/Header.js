import { NavLink, Link } from "react-router-dom";

const Header =({user, logout}) => {
  return (
    <header className="App-header d-flex align-items-center justify-content-between mx-5 my-3">
        <Link to="/"><h1>J&J</h1></Link>
        <nav>
            <ul className="d-flex align-items-center">
                <li><NavLink to="/" className="nav-link">Accueil</NavLink></li>
                {user && Object.keys(user).length > 0 ? (
                  <>
                    <li className="ms-5"><NavLink to="/panier" className="nav-link">Panier</NavLink></li>
                    <li className="ms-5"><NavLink to="/account" className="nav-link">Mon compte</NavLink></li>
                    <li className="ms-5"><NavLink to="/login" className="nav-link" onClick={() => {logout()}}>Déconnexion</NavLink></li>
                  </>
                ) : (
                  <>
                    <li className="ms-5"><NavLink to="/panier" className="nav-link">Panier</NavLink></li>
                    <li className="ms-5"><NavLink to="/login" className="nav-link">Connexion</NavLink></li>
                    <li className="ms-5"><NavLink to="/inscription" className="nav-link">Inscription</NavLink></li>
                  </>
                )}
            </ul>
        </nav>
    </header>
  );
}

export default Header;

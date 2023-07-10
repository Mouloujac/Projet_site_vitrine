import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { replaceCart } from "./redux/cartSlice";
import { toast } from "react-toastify";

import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Account from './pages/Account/Account';
import Login from './pages/Auth/Login';
import Inscription from './pages/Auth/Inscription';
import Product from './pages/Product/Product'
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin/Admin';
import axios from './axios';
import Cart from './pages/Cart/Cart';
import Contact from './pages/Contact/Contact'
import Footer from './components/Footer'

import "./App.css"





const App = () => {
  const [produits, setProduits] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => JSON.parse(sessionStorage.getItem('Produit')));
  const dispatch = useDispatch();

  

  useEffect(() => {

    axios.get('/api/user').then((response) => {
      setUser(response.data);
    }).catch((error) => {
      setUser()
    }).finally(() => {
      setLoading(false);
    })
    
  }, [navigate])

  const handleLogout = () => {
    axios.post('/logout');
    setUser();
    navigate('/login');
  }

  

  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link>
      { !loading ? ( 
        <>
      <ToastContainer position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        pauseOnHover={false}
      />
      
        <Navbar user={user} logout={handleLogout} />
        
          <Routes>
              <Route path="/admin" element={<Admin user={user} setUser={setUser}/>} />
              <Route path="/" element={<Home user={user} />}/>
              <Route path="/home" element={
              <>
              
              <Home user={user} />
              </>} />
              <Route path="/panier" element={ <Cart user={user} {...cartItems}/> } />
              <Route element={<ProtectedRoute user={user} />}>
                <Route path="/account" element={<Account user={user} setUser={setUser} />} />
              </Route>
              <Route path="/login" element={<Login user={user} setUser={setUser} />}/>
              <Route path="/inscription" element={<Inscription setUser={setUser} />}/>
              <Route path="/produits/:id" element={<Product  user={user} setUser={setUser} />} />
              <Route path="/contact" element={<Contact user={user} setUser={setUser} />} />
          </Routes>
          <Footer/>
        </>
        
      ) : (
        <div className="d-flex justify-content-center mt-5 flex-column">
          <div className="spinner-border" role="status">
          </div>
          <p>Chargement...</p>
        </div>
      )}
    </div>
  );
}

const AppAdmin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => JSON.parse(sessionStorage.getItem('Produit')));
  useEffect(() => {

    axios.get('/api/user').then((response) => {
      setUser(response.data);
      
    }).catch((error) => {
      setUser()
    }).finally(() => {
      setLoading(false);
    })
    
  }, [navigate])

  const handleLogout = () => {
    axios.post('/logout');
    setUser();
    navigate('/login');
  }
  return(
    <div className="App" >
    <Routes>
      <Route path="/admin" element={<Admin user={user} setUser={setUser}/>} />
    </Routes>
    </div>
  );
};
export default () => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');

  if (isAdminPage) {
    return <AppAdmin />;
  } else {
    return <App />;
  }
};

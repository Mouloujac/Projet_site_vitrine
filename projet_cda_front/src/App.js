import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Home from './pages/Home/Home';
import Account from './pages/Account/Account';
import Login from './pages/Auth/Login';
import Inscription from './pages/Auth/Inscription';
import Product from './pages/Product/Product'
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin/Admin';
import axios from './axios';
import Cart from './pages/Cart/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store'




const App = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    
    axios.get('/api/user').then((response) => {
      setUser(response.data);
    }).catch((error) => {
      setUser({})
    }).finally(() => {
      setLoading(false);
    })
    
  }, [navigate])

  const handleLogout = () => {
    axios.post('/logout');
    setUser({});
    navigate('/login');
  }

  return (
    <div className="App">
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
        <Header user={user} logout={handleLogout} />
        <div className='mx-5 py-5'>
        
          <Routes>
              <Route path="/admin" element={<Admin user={user} />} />
              <Route path="/" element={<Home user={user} />}/>
              <Route path="/home" element={<Home user={user} />}/>
              <Route path="/panier" element={<Cart user={user} />}/>
              <Route element={<ProtectedRoute user={user} />}>
                <Route path="/account" element={<Account user={user} setUser={setUser} />} />
              </Route>
              <Route path="/login" element={<Login user={user} setUser={setUser} />}/>
              <Route path="/inscription" element={<Inscription setUser={setUser} />}/>
              <Route path="/produits/:id" element={<Product  user={user} setUser={setUser} />} />
          </Routes>
        
        </div>
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

export default App;

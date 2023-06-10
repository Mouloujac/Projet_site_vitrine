import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import ProductsListe from './components/ProductListe';
import CommandesListe from './components/CommandesListe';
import axios from "./../../axios";
import CreateForm from './components/CreateForm';
import AdminLogin from './components/AdminLogin'
import { Modal, Button } from 'react-bootstrap';
import "./styles/Product.css"

const Admin = ({ user, setUser }) => {
  const [show, setShow] = useState(false);
  const [produits, setProduits] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateProducts = async () => {
    const response = await axios.get('/produits');
    console.log("ok")
    setProduits(response.data);
  }
  
  if (!user || user.isAdmin !== 1) {
    return (
      <>
        <AdminLogin user={user} setUser={setUser} />
      </>
    );
  }
  

  return (
    <section id="admin">
      <ProductsListe user={user} updateProducts={updateProducts}/>
      <div id="line">
      <CreateForm user={user} updateProducts={updateProducts} />
      <CommandesListe {...user} />
      </div>
    </section>
  );
};


export default Admin;
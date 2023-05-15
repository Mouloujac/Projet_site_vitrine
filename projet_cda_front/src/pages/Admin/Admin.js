import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import ProductsListe from './components/ProductListe';
import CommandesListe from './components/CommandesListe';
import axios from "./../../axios";
import CreateForm from './components/CreateForm';

import { Modal, Button } from 'react-bootstrap';


const Admin = ({ user }) => {
  const [show, setShow] = useState(false);
  const [produits, setProduits] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateProducts = async () => {
    const response = await axios.get('/produits');
    console.log("ok")
    setProduits(response.data);
  }
  

  return (
    <>
      <ProductsListe user={user} updateProducts={updateProducts}/>
      <CommandesListe {...user} />
      
    </>
  );
};


export default Admin;
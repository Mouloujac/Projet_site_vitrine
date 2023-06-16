import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import ProductsListe from './components/ProductListe';
import CommandesListe from './components/CommandesListe';
import axios from "./../../axios";
import CreateForm from './components/CreateForm';
import AdminLogin from './components/AdminLogin'
import UpdateForm from './components/UpdateForm';
import "./styles/Product.css"

const Admin = ({ user, setUser }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [produits, setProduits] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setSelectedProduct(null);

  useEffect(() => {
    axios.get('/produits').then((response) => {
      setProduits(response.data);
      
    }).catch((error) => {
      setProduits([])
      console.error(error);
    });
  }, []) // [] = componentDidMount (exécuté une seule fois)

  const handleUpdate = async (updateProduct) => {
    try {
      handleClose();
      console.log("ok product");
      updateProducts(updateProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = (produit) => {
    setShow(false);
    setSelectedProduct(produit);
    setShow(true);
  };
  

  const updateProducts = async () => {
    const response = await axios.get('/produits');
    console.log("ok")
    setProduits(response.data);
  }

  const deleteProducts = async (produits) => {
    axios.delete('/produits').then((response) => {
      setProduits(response.data);
      
    }).catch((error) => {
      setProduits([])
      console.error(error);
    });
  },  // [] = componentDidMount (exécuté une seule fois)
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
      <ProductsListe user={user} updateProducts={updateProducts} produits={produits} setProduits={setProduits} handleShow={handleShow}/>
      <div id="line">
      <CreateForm user={user} updateProducts={updateProducts} />
      <CommandesListe {...user} />
      {selectedProduct && (
        <UpdateForm
          user={user}
          produit={selectedProduct}
          handleClose={handleClose}
          handleUpdate={handleUpdate}
          updateProducts={updateProducts}
          handleShow={handleShow}
        />
      )}
      </div>
    </section>
  );
};


export default Admin;
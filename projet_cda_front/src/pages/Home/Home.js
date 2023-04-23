
import 'react-toastify/dist/ReactToastify.css';
import ProductsListe from './components/ProductsListe';



const Home = ({ user }) => {


  return (
    <ProductsListe user={user}  />
  );
}

export default Home;

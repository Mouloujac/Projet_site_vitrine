
import 'react-toastify/dist/ReactToastify.css';
import ProductsListe from './components/ProductsListe';
import './styles/Home.css'

const Home = ({ user }) => {
  
  return (
    <div id='homeContainer'>
    <ProductsListe user={user}  />
   
    </div>
  );
}

export default Home;

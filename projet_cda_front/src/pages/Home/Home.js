
import 'react-toastify/dist/ReactToastify.css';
import ProductsListe from './components/ProductsListe';
import './styles/Home.css'
import Header from '../../components/Header'

const Home = ({ user }) => {
  
  return (
    <div id='homeContainer'>
      <Header />
    <ProductsListe user={user}  />
   
    </div>
  );
}

export default Home;

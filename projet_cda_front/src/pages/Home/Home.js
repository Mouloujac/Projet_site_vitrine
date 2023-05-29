
import 'react-toastify/dist/ReactToastify.css';
import ProductsListe from './components/ProductsListe';
import Footer from '../../components/Footer'
import './styles/Home.css'

const Home = ({ user }) => {
  
  return (
    <div id='homeContainer'>
    <ProductsListe user={user}  />
    <Footer/>
    </div>
  );
}

export default Home;

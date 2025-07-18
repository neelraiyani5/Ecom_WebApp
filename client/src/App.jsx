import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Product from './components/mainPages/products/Product';
import Login from './components/mainPages/auth/Login';
import Register from './components/mainPages/auth/Register';
import Cart from './components/mainPages/cart/Cart';
import GlobalStateProvider from './context/GlobalStateProvider';
import DetailProduct from './components/mainPages/DetailProduct/DetailProduct';

function App() {
  return (
    <GlobalStateProvider>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Product />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/details/:id' element={<DetailProduct/>}/>
            <Route path='*' element={<p>No page found</p>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
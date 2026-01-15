import ProductList from './components/ProductList';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar.jsx";
import Contact from "./pages/Contact.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Cart from "./pages/Cart.jsx";
import {useState} from "react";
import {ProductContext} from "./components/ProductContext.jsx";
import {ThemeContext} from "./components/ThemeContext.jsx";

function App() {
    const [products, setProducts] = useState([])
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ProductContext.Provider value={{products, setProducts}}>
                <div className="App">
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path={`/products/:id`} element={<ProductPage/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                    </Routes>
                </div>
            </ProductContext.Provider>
        </ThemeContext.Provider>
    );
}

export default App;

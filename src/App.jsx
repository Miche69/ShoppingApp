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
import NotFound from "./pages/NotFound.jsx";

function App() {
    const [products, setProducts] = useState([])
    const [theme, setTheme] = useState('light');

    const root = document.documentElement;

    function animateScrollbarColor(from, to, className, duration = 700) {
        let start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);

            // interpolate RGB values
            const r = Math.round(from[0] + (to[0] - from[0]) * progress);
            const g = Math.round(from[1] + (to[1] - from[1]) * progress);
            const b = Math.round(from[2] + (to[2] - from[2]) * progress);

            root.style.setProperty(`${className}`, `rgb(${r}, ${g}, ${b})`);

            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

// example usage
// from light gray [196,196,196] to dark gray [80,80,80]
    animateScrollbarColor([34,34,34], [255,255,255], "--track");
    animateScrollbarColor([255,255,255], [34,34,34], "--trackDark");
    animateScrollbarColor([83,83,83], [196,196,196], "--thumb");
    animateScrollbarColor([196,196,196], [83,83,83], "--thumbDark");


    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <ProductContext.Provider value={{products, setProducts}}>
                <div className="App w-full">
                    <NavBar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path={`/products/:id`} element={<ProductPage/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/*" element={<NotFound/>}/>
                        </Routes>
                </div>
            </ProductContext.Provider>
        </ThemeContext.Provider>
    );
}

export default App;

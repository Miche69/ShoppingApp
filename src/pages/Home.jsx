import ProductList from "../components/ProductList";
import NavBar from "../components/NavBar.jsx";
import {useContext} from "react";
import {ThemeContext} from "../components/ThemeContext.jsx";

export default function Home() {
    const {theme} = useContext(ThemeContext);

    return theme === "light" ? (
        <div className="home-page">
            <ProductList />
        </div>
    ) : (
        <div className="home-page bg-neutral-900 text-neutral-300">
            <ProductList />
        </div>
    );
}
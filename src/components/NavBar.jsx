import Searchbar from "./Searchbar";
import {Link} from "react-router-dom";
import {ThemeContext} from "./ThemeContext.jsx";
import {useContext, useEffect} from "react";

export default function NavBar() {
    const {theme, setTheme} = useContext(ThemeContext);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, [])

    function changeTheme() {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return theme === 'light' ? (
        <div className="header flex border-box border-neutral-300 text-base p-4 justify-between gap-5  border-b">

            <div className="flex gap-5">
                <Link className="gap-4" to="/">Home</Link>
                <Link className="gap-4" to="/about">Über uns</Link>
                <Link to="/contact">Kontakt</Link>
            </div>
            <div className="justify-end flex items-center">
                <button type="button" onClick={() => {
                    changeTheme()
                }}>
                    <img src="/icons8-sun-50.png" alt="dark"
                         height={30} width={30}
                    />
                </button>
                <Link to="/cart"><img src="/cart.webp" alt="Cart" height="40" width="40"/></Link>
            </div>

        </div>
    ) : (
        <div className="header flex border-box bg-neutral-800 text-neutral-300 border-neutral-700 text-base p-4 justify-between gap-5  border-b">

            <div className="flex gap-5">
                <Link className="gap-4" to="/">Home</Link>
                <Link className="gap-4" to="/about">Über uns</Link>
                <Link to="/contact">Kontakt</Link>
            </div>
            <div className="justify-end flex items-center">
                <button type="button" onClick={() => {
                    changeTheme()
                }}>
                    <img src="/icons8-moon-50.png" alt="dark"
                         height={30} width={30}
                    />
                </button>
                <Link to="/cart"><img src="/cart.webp" alt="Cart" height="40" width="40" style={{ filter: 'invert(1)' }}/></Link>
            </div>
        </div>
    )
}


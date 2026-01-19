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

        const isDark =
            localStorage.getItem("theme") === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);
        document.documentElement.classList.toggle("dark", isDark);
    }, [theme]);


    return (
        <div
            className="flex w-full fixed ease-in-out duration-700 bg-white text-black border-neutral-300 justify-between gap-5 border-b dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700">
            <div className="flex p-4 gap-5">
                <Link className="gap-4" to="/">Home</Link>
                <Link className="gap-4" to="/about">Über uns</Link>
                <Link to="/contact">Kontakt</Link>
            </div>
            <div className="justify-end flex gap-3 pr-2 pl-2 items-center">
                <div className="flex bg-neutral-300 w-20 ease-in-out duration-700 dark:bg-neutral-700 rounded-full p-1 gap-3"
                    onClick={changeTheme}
                >
                    <button type="button" className="invert-0 bg-white rounded-full cursor-pointer dark:bg-neutral-500 dark:translate-x-full transition-all duration-350 ease-in-out translate-x-0 p-2 active:">
                        { theme === "light" &&
                            <img src="/icons8-sun-50.png" alt="dark"
                                 height={20} width={20}
                            />
                        }
                        {theme === 'dark' && (
                            <img src="/icons8-moon-50.png" className="" alt="dark"
                                 height={20} width={20}
                            />
                        )}
                    </button>
                </div>
                <Link to="/cart"><img className="invert-0 dark:invert ease-in-out duration-700" src="/cart.webp" alt="Cart" height="40"
                                      width="40"/></Link>
            </div>
        </div>
    )
}


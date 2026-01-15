import {useContext} from "react";
import {ThemeContext} from "../components/ThemeContext.jsx";

export default function About() {
    const {theme} = useContext(ThemeContext);

    return theme === "light" ? (
        <div className="about-page h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Über uns</h1>
            <p className="mb-2">Willkommen bei unserem Shop! Wir sind stolz darauf, Ihnen eine breite Auswahl an hochwertigen Produkten zu bieten.</p>
            <p className="mb-2">Unsere Mission ist es, Ihnen das beste Einkaufserlebnis zu bieten, indem wir qualitativ hochwertige Produkte zu wettbewerbsfähigen Preisen anbieten.</p>
        </div>
    ) : (
        <div className="about-page bg-neutral-900 text-neutral-300 h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Über uns</h1>
            <p className="mb-2">Willkommen bei unserem Shop! Wir sind stolz darauf, Ihnen eine breite Auswahl an hochwertigen Produkten zu bieten.</p>
            <p className="mb-2">Unsere Mission ist es, Ihnen das beste Einkaufserlebnis zu bieten, indem wir qualitativ hochwertige Produkte zu wettbewerbsfähigen Preisen anbieten.</p>
        </div>
    )
}
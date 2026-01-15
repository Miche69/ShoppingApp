import {useContext} from "react";
import {ThemeContext} from "../components/ThemeContext.jsx";

export default function Contact() {
    const {theme} = useContext(ThemeContext);

    return theme === "light" ? (
        <div className="contact-page h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Kontaktieren Sie uns</h1>
            <p className="mb-2">Wenn Sie Fragen oder Anregungen haben, zögern Sie bitte nicht, uns zu kontaktieren. Wir sind hier, um Ihnen zu helfen!</p>
            <p className="mb-2">E-Mail:
                <a href="mailto:michelle.braendli@icloud.com" className="text-indigo-500 ml-1">
                    michelle.braendli@student.ksh.ch
                </a>
            </p>
        </div>
    ) : (
        <div className="contact-page p-4 bg-neutral-900 h-screen text-neutral-300">
            <h1 className="text-2xl font-bold mb-4">Kontaktieren Sie uns</h1>
            <p className="mb-2">Wenn Sie Fragen oder Anregungen haben, zögern Sie bitte nicht, uns zu kontaktieren. Wir sind hier, um Ihnen zu helfen!</p>
            <p className="mb-2">E-Mail:
                <a href="mailto:michelle.braendli@icloud.com" className="text-indigo-500 ml-1">
                    michelle.braendli@student.ksh.ch
                </a>
            </p>
        </div>
    )
}
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ThemeContext} from "./ThemeContext.jsx";

export default function Product(props) {
    const {theme} = useContext(ThemeContext);

    return (
        <div className="product flex flex-col">
            <Link to={`/products/${props.product.id}`}>
                {theme === 'light' ? (
                <img
                    src={props.product.thumbnail}
                    alt="Product Image"
                    width={300}
                    height={300}
                    className="bg-stone-100"
                />
            ) : (
                <img
                    src={props.product.thumbnail}
                    alt="Product Image"
                    width={300}
                    height={300}
                    className="bg-stone-800"
                />
            )}
                <p>{props.product.title}</p>
                {theme === 'light' ? (
                <p className="font-light text-gray-700">{props.product.description}</p>
            ) : (
                <p className="font-light text-gray-400">{props.product.description}</p>
            )}
                <p className="font-bold mt-2">${props.product.price}</p>
            </Link>
        </div>
    )
}





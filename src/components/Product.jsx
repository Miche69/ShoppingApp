import {Link} from "react-router-dom";

export default function Product(props) {
    return (
        <div className="product flex text-black ease-in-out duration-700 dark:text-neutral-300 flex-col">
            <Link to={`/products/${props.product.id}`}>
                <img
                    src={props.product.thumbnail}
                    alt="Product Image"
                    width={300}
                    height={300}
                    className="bg-stone-100 ease-in-out duration-700 dark:bg-stone-800"
                />
                <p>{props.product.title}</p>
                <p className="font-light ease-in-out duration-700 text-gray-700 dark:text-gray-400">{props.product.description}</p>
                <p className="font-bold mt-2 dark:">${props.product.price}</p>
            </Link>
        </div>
    )
}





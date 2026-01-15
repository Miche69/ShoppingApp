import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {ProductContext} from "./ProductContext.jsx";
import {ThemeContext} from "./ThemeContext.jsx";

export default function CartItem(props) {
    const {theme} = useContext(ThemeContext);

    const {products, setProducts} = useContext(ProductContext);

    function updateProducts(product) {
        const quantity = Number(document.querySelector("#quantity").innerText);
        setProducts((prevState) => {
            return prevState.map(p =>
                p.id === product.id
                    ? {...p, quantity: p.quantity + quantity}
                    : p
            )

        })
        console.log(product, quantity);
    }

    function deleteProduct(id) {
        setProducts(prevProducts =>
            prevProducts.filter(product => product.id !== id)
        );
        if (products.length === 1) {
            localStorage.removeItem("products");
        }
    }

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products || []));
    }, [products]);

    return theme === "light" ? (
        <tr key={props.product.id} className="cartItem border-t border-neutral-300 border-light">
            <Link to={`/products/${props.product.id}`}>
                <td className="">
                    <div className="flex justify-center p-4 gap-5 items-center">
                        <img
                            src={props.product.thumbnail}
                            alt="Product Image"
                            width={100}
                            height={100}
                            className="bg-stone-100"
                        />
                        <p className="font-bold">{props.product.title}</p>
                    </div>
                </td>
            </Link>
            <td className="font-semibold p-4">
                ${(props.product.price * props.product.quantity).toFixed(2)}
            </td>
            <td className="p-4">
                <div className="flex justify-center align-items-center ">
                    <button className="border-neutral-300 p-2 border w-10 flex justify-center disabled:text-neutral-500"
                            disabled={props.product.quantity <= 1}
                            onClick={() => {
                                updateProducts(props);
                                props.product.quantity -= 1;
                            }}
                    >
                        -
                    </button>
                    <p id="quantity"
                       className="border-neutral-300 p-2 border-b border-t w-10 justify-center flex"> {props.product.quantity} </p>
                    <button className="border-neutral-300 p-2 border w-10 flex justify-center disabled:text-neutral-500"
                            disabled={props.product.quantity >= props.product.minimumOrderQuantity}
                            onClick={() => {
                                updateProducts(props);
                                props.product.quantity += 1;
                            }}>
                        +
                    </button>
                </div>
            </td>
            <td className=" p-4" onClick={ () => deleteProduct(props.product.id)}>
                <div className="flex justify-center align-items-center ">
                    <img src="/icons8-trash-50.png" alt="remove"
                        height={30}
                         width={30}
                    />
                </div>
            </td>
        </tr>
    ) : (
        <tr key={props.id} className="cartItem border-t border-neutral-700 border-light">
            <Link to={`/products/${props.product.id}`}>
                <td className="">
                    <div className="flex justify-center p-4 gap-5 items-center">
                        <img
                            src={props.product.thumbnail}
                            alt="Product Image"
                            width={100}
                            height={100}
                            className="bg-stone-800"
                        />
                        <p className="font-bold">{props.product.title}</p>
                    </div>
                </td>
            </Link>
            <td className="font-semibold p-4">
                ${(props.product.price * props.product.quantity).toFixed(2)}
            </td>
            <td className="p-4">
                <div className="flex justify-center align-items-center ">
                    <button className="border-neutral-700 p-2 border w-10 flex justify-center disabled:text-neutral-500"
                            disabled={props.product.quantity <= 1}
                            onClick={() => {
                                updateProducts(props);
                                props.product.quantity -= 1;
                            }}
                    >
                        -
                    </button>
                    <p id="quantity"
                       className="border-neutral-700 p-2 border-b border-t w-10 justify-center flex"> {props.product.quantity} </p>
                    <button className="border-neutral-700 p-2 border w-10 flex justify-center disabled:text-neutral-500"
                            disabled={props.product.quantity >= props.product.minimumOrderQuantity}
                            onClick={() => {
                                updateProducts(props);
                                props.product.quantity += 1;
                            }}>
                        +
                    </button>
                </div>
            </td>
            <td className=" p-4" onClick={ () => deleteProduct(props.product.id)}>
                <div className="flex justify-center align-items-center ">
                    <img src="/icons8-trash-50.png" alt="remove"
                         height={30}
                         width={30}
                    />
                </div>
            </td>
        </tr>
    )
}
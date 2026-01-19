import {useContext, useEffect, useState} from "react";
import {ProductContext} from "../components/ProductContext.jsx";
import {Link} from "react-router-dom";
import CartItem from "../components/CartItem.jsx";


export default function Cart() {
    const {products, setProducts} = useContext(ProductContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);


    useEffect(() => {
        const savedProducts = localStorage.getItem("products");
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    useEffect(() => {
        const total = products.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
        );

        const discount = products.reduce(
            (sum, product) =>
                sum + (product.price * (product.discountPercentage || 0) / 100) * product.quantity,
            0
        );
        setTotalPrice(total);
        setDiscountPrice(discount);
    }, [products]);

    function checkout() {
        setProducts([]);

        localStorage.removeItem("products");
    }

    return (
        <div
            className="cart-page p-4 bg-white text-black dark:bg-neutral-900 dark:text-neutral-300 ease-in-out duration-700 pt-20 min-h-screen">
            <h1 className="text-3xl font-bold mb-3">Shopping Cart</h1>
            {products && products.length > 0 && (
                <div className="flex items-start gap-5">
                    <div
                        className="border rounded-xl dark:border-neutral-700 ease-in-out duration-700 border-neutral-300">
                        <table className="table-auto">
                            <thead>
                            <tr className="container p-4">
                                <th className="p-4 text-left">Products</th>
                                <th className="p-4 text-left">Price</th>
                                <th className="p-4 text-left">Quantity</th>
                                <th className="p-4 text-left">Remove</th>
                            </tr>
                            </thead>

                            <tbody className="cart">
                            {products.map((product) => (
                                <CartItem key={product.id} product={product}/>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div
                        className="flex flex-col h-auto border flex-2 w-full rounded-xl p-4 dark:border-neutral-700 ease-in-out duration-700 border-neutral-300">
                        <p className="text-lg font-bold border-b dark:border-neutral-700 ease-in-out duration-700 border-neutral-300 pb-3 ">Total</p>
                        <div
                            className="pb-3 pt-3 border-b dark:border-neutral-700 ease-in-out duration-700 border-neutral-300">
                            <div className="flex justify-between">
                                <p className="font-semibold">Total: </p>
                                <p className="font-semibold">${(totalPrice).toFixed(2)} </p>
                            </div>
                            <div className="flex justify-between">
                                <p>Discount: </p>
                                <p className="font-semibold">-${discountPrice.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex justify-between pb-3 pt-3 ">
                            <p>Subtotal: </p>
                            <p className="font-semibold">${(totalPrice - discountPrice).toFixed(2)}</p>
                        </div>
                        <div>
                            <button className="bg-indigo-500 w-full cursor-pointer text-white p-2 rounded-xl"
                                    onClick={() => checkout()}
                            >Checkout
                            </button>
                            <p className="font-semibold pb-2 pt-2 text-neutral-500">We accept:</p>
                            <div className="flex gap-4 pb-2 pt-2 align-items-center">
                                <img className="h-5 w-auto" src="/PayPal.svg.webp" alt="PayPal"/>
                                <img className="h-5 w-auto" src="/Visa_2021.svg.png" alt="Visa"/>
                                <img className="h-5 w-auto" src="/Mastercard_2019_logo.svg" alt="Mastercard"/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {products && products.length <= 0 && (
                <div className="container">
                    <p>Ihr Warenkorb ist derzeit leer.</p>
                </div>
            )}
        </div>
    )
}

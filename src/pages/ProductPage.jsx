import {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Product from "../components/Product.jsx";
import Moment from 'moment';
import {ProductContext} from "../components/ProductContext.jsx";
import {ThemeContext} from "../components/ThemeContext.jsx";

export default function ProductPage() {
    const {theme} = useContext(ThemeContext);
    const [data, setData] = useState([])
    const {products, setProducts} = useContext(ProductContext);

    const params = useParams();
    const fetchData = async () => {
        try {
            let response = await fetch(`https://dummyjson.com/products/${params.id}`);
            let data = await response.json();
            setData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    });

    function addProduct(product) {
        const quantity = Number(document.querySelector("select[name='quantity']").value);

        setProducts((prevState) => {
            const existingProduct = prevState.find(p => p.id === product.id);
            if (existingProduct) {
                return prevState.map(p =>
                    p.id === product.id
                        ? {...p, quantity: p.quantity + quantity}
                        : p
                )
            } else {
                return [...prevState, {...product, quantity}];
            }
        })
    }

    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem("products", JSON.stringify(products));
        }
    }, [products]);

    function getQuantity(id) {
        return products.find(p => p.id === id)?.quantity || 0;
    }

    return (
        <div
            className="product ease-in-out duration-700 bg-white text-black dark:bg-neutral-900 dark:text-neutral-300 flex pt-20 flex-col p-4">
            <div className="content flex">
                <div className="flex font-bold mb-4">
                    <img
                        src={data.images && data.images[0]}
                        alt="Product Image"
                        width={575}
                        height={575}
                        className="bg-stone-100 ease-in-out duration-700 dark:bg-stone-800"
                    />
                </div>
                <div className="flex-1/2 flex flex-col p-4 justify-center ">
                    <p className="text-4xl mb-3">{data.title}</p>
                    <p className="text-indigo-500">Marke: {data.brand}</p>
                    <p className="border-b-1 border-neutral-300 ease-in-out duration-700 dark:border-neutral-700  mb-3">Rating: {data.rating}</p>
                    {data.discountPercentage &&
                        <div className="flex align-items-center justify-between">
                            <div className="flex pt-2 pb-2 gap-2">
                                <p className="font-bold text-xl">${(data.price * (100 - data.discountPercentage) / 100).toFixed(2)}</p>
                                <p className="line-through text-xl font-light ease-in-out duration-700 dark:text-gray-400 text-gray-600">${data.price}</p>
                            </div>
                            <p className="text-white p-2 bg-red-500 rounded-xl">{data.discountPercentage}%</p>
                        </div>
                    }
                    {!data.discountPercentage &&
                        <p className="font-bold text-xl mt-2">${data.price}</p>
                    }
                    <p className="font-light text-gray-700 ease-in-out duration-700 dark:text-gray-400">{data.description}</p>
                    <ul className="list-disc ml-5 mt-2">
                        <li className="font-light text-gray-700 ease-in-out duration-700 dark:text-gray-400">Breite: {data.dimensions?.width}</li>
                        <li className="font-light text-gray-700 ease-in-out duration-700 dark:text-gray-400">Höhe: {data.dimensions?.height}</li>
                        <li className="font-light text-gray-700 ease-in-out duration-700 dark:text-gray-400">Tiefe: {data.dimensions?.depth}</li>
                    </ul>
                    <div
                        className="border-neutral-300 ease-in-out duration-700 dark:border-neutral-700 border-1 rounded-xl p-4 mt-4">
                        {data.availabilityStatus === "In Stock" &&
                            <p className="text-green-700 text-2xl mb-2">In Lager</p>
                        }
                        {data.availabilityStatus === "Low Stock" &&
                            <p className="text-yellow-600 text-2xl mb-2">Wenig im Lager!</p>
                        }
                        <p>Anzahl im Lager: {data.stock}</p>
                        <p className="font-semibold mb-3">{data.shippingInformation}</p>
                        {getQuantity(data.id) > 0 &&
                            <p className="font-semibold mb-3 text-green-700">Sie haben
                                bereits {getQuantity(data.id)} Stück dieses Produkts im Warenkorb.</p>
                        }
                        <div>
                            <div
                                className="border-1 bg-gray-200 ease-in-out duration-700 border-gray-400 dark:bg-neutral-800 dark:border-neutral-700 flex justify-between rounded-xl p-2 mb-2">
                                <label className="">Menge:</label>
                                <select
                                    className="justify-end w-full bg-gray-200 ease-in-out duration-700 dark:bg-neutral-800 border-none"
                                    name="quantity">
                                    {(() => {
                                        const quantityInCart = getQuantity(data.id);
                                        const remainingQuantity = Math.max(0, data.minimumOrderQuantity - quantityInCart);

                                        if (remainingQuantity === 0) {
                                            return (
                                                <option value="0">0</option>
                                            );
                                        }

                                        return Array.from(
                                            {length: remainingQuantity},
                                            (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))
                                    })()}
                                </select>
                            </div>
                            <button type="submit" className="bg-indigo-500 text-white rounded-xl p-2 justify-end"
                                    onClick={() => addProduct(data)}
                            >In
                                den
                                Warenkorb
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-5xl mb-2">Kundenrezensionen</h1>
                {data.reviews && data.reviews.map((review, index) => (
                        <div key={index}
                             className="border-t-1 dark:border-neutral-700 ease-in-out duration-700  border-neutral-300 p-2">
                            <p className="font-bold">{review.reviewerName}</p>
                            <p className="font-light ease-in-out duration-700 dark:text-gray-400 text-gray-700">Bewertet
                                am {Moment(review.date).format('DD.MM.YYYY')}</p>
                            <p>Rating: {review.rating}</p>
                            <p className="font-light dark:text-gray-400 ease-in-out duration-700 text-gray-700 dark:text-g">{review.comment}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}


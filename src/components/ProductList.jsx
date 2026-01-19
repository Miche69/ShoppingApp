import Product from './Product';
import {useEffect, useState} from "react";

export default function ProductList() {
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 12;
    const total = Math.ceil(data.total / limit);

    const fetchData = async () => {
        try {
            let skip = (currentPage - 1) * limit;
            if (searchQuery.trim() !== "") {
                let response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`);
                let data = await response.json();
                setData(data);
            }
            else {
                let response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`);
                let data = await response.json();
                setData(data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    return (
        <div className="p-4 pt-15 ease-in-out duration-700 min-h-screen text-black dark:text-neutral-300">
            <div className="flex border-box pb-5 pt-5 justify-between">
                <h2 className="text-xl font-bold">Trending products</h2>
                <a className="text-indigo-500 font-semibold text-lg">Shop the collection →</a>
            </div>
            <form onSubmit={e => {e.preventDefault();
                e.preventDefault();
                fetchData();
                setCurrentPage(1)
            }}>
                <input
                    id="search"
                    name="searchQuery"
                    type="text"
                    value={searchQuery}
                    placeholder="Search Products"
                    className="p-2 border-1 ease-in-out duration-700 rounded-xl text-black dark:text-neutral-300 border-gray-500 mb-5"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    type="button"
                    className="ml-2 p-2 cursor-pointer bg-indigo-500 text-white rounded-xl"
                    onClick={() => {
                        fetchData(); setCurrentPage(1)
                    }}
                >
                    Search
                </button>
            </form>
            <div className="products inline-grid grid-cols-4 gap-10">
                {data.products && data.products.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            {total > 1 &&
            <div className="pagination flex justify-center pt-8 items-center space-x-3 box-border">
                {currentPage !== 1 && (
                    <button
                        className="flex w-10 h-10 cursor-pointer justify-center items-center border-gray-400 rounded-full border"
                        onClick={() => setCurrentPage(1)}>
                        {"<<"}
                    </button>
                )}
                {currentPage - 1 > 0 && (
                    <button
                        className="w-10 h-10 justify-center cursor-pointer items-center border-gray-400 rounded-full border"
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        {"<"}
                    </button>
                )}
                {currentPage - 2 > 0 && (
                    <button
                        className=" w-10 h-10 cursor-pointer border-gray-400 rounded-full border"
                        onClick={() => setCurrentPage(currentPage - 2)}>
                        {currentPage - 2}
                    </button>
                )}
                {currentPage - 1 > 0 && (
                    <button
                        className="w-10 h-10 cursor-pointer border-gray-400 rounded-full border-1"
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        {currentPage - 1}
                    </button>
                )}
                {total !== 1 &&
                <button className="bg-indigo-500 text-white  w-10 h-10 rounded-full">{currentPage}</button>
                }
                {currentPage + 1 <= total && (
                    <button
                        className="w-10 h-10 cursor-pointer border-gray-400 rounded-full border"
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        {currentPage + 1}
                    </button>
                )}
                {currentPage + 2 <= total && (
                    <button
                        className="w-10 h-10 cursor-pointer border-gray-400 rounded-full border"
                        onClick={() => setCurrentPage(currentPage + 2)}>
                        {currentPage + 2}
                    </button>
                )}
                {currentPage + 1 <= total && (
                    <button
                        className="w-10 h-10 cursor-pointer justify-center items-center border-gray-400 rounded-full border"
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        {">"}
                    </button>
                )}
                {currentPage !== total && (
                    <button
                        className="w-10 h-10 cursor-pointer justify-center items-center border-gray-400 rounded-full border"
                        onClick={() => setCurrentPage(total)}>
                        {">>"}
                    </button>
                )}
            </div>
            }
        </div>
    )
}

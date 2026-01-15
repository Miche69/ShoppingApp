import ProductList from "./ProductList";
import React, {useState} from 'react'

export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState("")

    ProductList(searchQuery);
    return (
        <form onSubmit={e => e.preventDefault()}>
            <input
                name="searchQuery"
                type="text"
                value={searchQuery}
                placeholder="Search Products"
                className="p-2 border-1 rounded-xl border-gray-500"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </form>
    )
}


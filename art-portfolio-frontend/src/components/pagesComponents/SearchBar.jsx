import { useState } from "react";

export default function SearchBar(){
    const [keyword, setKeywordData] = useState("");
    
    const handleChange = (e) => {
        const value = e.target.value;
        setKeywordData({
          ...keyword,
          [e.target.name]: value
        });
      };  

    return(      
        <form className="max-w-128 min-w-40 xl:w-128 inline-flex bg-red-200/15 rounded-2xl">
                <svg className="w-7 h-7 mt-0.5 ml-1 pt-1 pl-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="#cacab9" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <input type="search" name="search" value={keyword.value} onChange={handleChange}
                        className="block p-2 w-full text-bone text-sm focus:outline-none placeholder:text-bone/80" placeholder="Шукати..." required />
                <button type="submit">
                    <span className="sr-only">Search</span>
                </button>
        </form>
    )
}
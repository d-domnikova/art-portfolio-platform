import { useState, useEffect } from "react";
import axios from "axios";

export default function PostPreview(props){
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7029/api/post/${props.id}`)
        .then(response => {
            axios.get(`https://localhost:7029/api/user/${response.data.userId}`)
            .then(response => {
                setUser(response.data); });
        })
        .catch(error => {
            console.error(error);
        });
    }, []);


    return(
        <a href={"/post/" + props.id} className="group relative aspect-square min-w-30 min-h-30 max-w-64 max-h-64 bg-white rounded-sm cursor-pointer 
                        md:hover:bg-linear-to-b/longer from-transperent to-black/30 transition-all duration-300 ease-in-out">
            <img src="https://placehold.co/320x320" className="object-center object-cover"/>
            <div className="hidden md:group-hover:block absolute bottom-0 inset-x-0 text-white">
                <p className="px-8 pt-2 flex flex-wrap font-bold text-lg">{props.title != undefined && `${props.title.slice(0, 20)}...`}</p>
                <p className="px-8 pb-2 font-semibold">{user.username}</p>
            </div>
        </a>
    )
}
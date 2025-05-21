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
        <a href={"/post/" + props.id} className="group relative aspect-square min-w-30 min-h-30 max-w-64 max-h-64 bg-white rounded-sm cursor-pointer overflow-hidden">
            <div className="min-w-30 min-h-30 max-w-64 max-h-64">
            <img src={props.imageSrc} className="object-cover object-center size-70"/>
            </div>
            <div className="pt-10 hidden md:group-hover:block absolute bottom-0 inset-x-0 text-white 
                            md:group-hover:bg-linear-to-b/longer from-transperent to-black/70 transition-all duration-300 ease-in-out">
                <p className="px-4 pt-2 flex flex-wrap font-bold text-lg">{props.title != undefined && `${props.title.slice(0, 20)}...`}</p>
                <p className="px-4 pb-2 font-semibold">{user.username}</p>
            </div>
        </a>
    )
}
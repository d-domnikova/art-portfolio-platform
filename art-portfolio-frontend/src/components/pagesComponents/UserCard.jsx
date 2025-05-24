import Location from "../icons/Location";
import Web from "../icons/Web";

export default function UserCard(props){
    return(
         <div className="hidden md:block md:fixed bg-cardinal/25 h-[89%] px-6 rounded-xl text-bone w-70 lg:w-78 lg:top-20 top-18 right-4 space-y-2 mx-auto 
                            overflow-y-auto overscrol-y-contain">
            <a href={"/user/" + props.username} className="space-y-2">
                <div className="mt-6 md:size-28 lg:size-36 rounded-full justify-self-center overflow-hidden">
                    <img src={props.profileImageSrc != null ? props.profileImageSrc :"/defaultImages/ProfilePicture.png"} className="object-cover object-center"/>
                </div>
                <h1 className="text-white font-bold text-2xl justify-self-center">{props.nickname}</h1>
            <p className="justify-self-center pb-4">@{props.username}</p>
            </a>
            <p className={props.location == null ? "hidden" : "font-semibold pb-1"}><Location /> {props.location != null && props.location}</p>
            <p className={props.website == null ? "hidden" : "font-semibold pb-1"}><Web /> {props.website != null && props.website}</p>
            <div className="font-semibold space-x-6 flex pb-4">
                <a href={"/commissions/" + props.username} className="hover:text-white hover:underline">Commissions</a>
                <a href={"/shop/" + props.username} className="hover:text-white hover:underline">Shop</a>
            </div>
            {localStorage.getItem("userId") != props.id ?
                <button className="text-white font-semibold tracking-wide bg-cardinal hover:bg-red-800/75 hover:ring-1 rounded-3xl px-5 py-2 text-center mb-6">Follow</button> :
            <a href="/settings" className="block font-semibold tracking-wide border hover:bg-red-800/50 text-white rounded-3xl px-5 py-2 text-center mb-6">Edit profile</a>
            }
            <p>{props.biography}</p>
        </div>
    )
}
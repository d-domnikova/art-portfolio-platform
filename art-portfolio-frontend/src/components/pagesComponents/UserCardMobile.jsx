import Location from "../icons/Location";
import Web from "../icons/Web";

export default function UserCardMobile(props){
    return(
        <div className="md:hidden text-bone relative mt-4 block px-6 py-4 bg-cardinal/25 rounded-xl">
            <a href={"/user/" + props.username} className="flex justify-start">
                <div className="mt-2 size-16 rounded-full overflow-hidden">
                    <img src={props.profileImageSrc != null ? props.profileImageSrc :"/defaultImages/ProfilePicture.png"} className="object-cover object-center"/>
                </div>
                <div className="mb-4 ml-8">
                    <h1 className="text-white font-bold text-lg">{props.nickname != null && props.nickname}</h1>
                    <p className="mb-2 text-sm">@{props.username}</p>
                    <p className="text-sm">{props.biography != null && props.biography}</p>
                </div>
            </a>
            <div className="mt-4 grid grid-cols-2 gap-y-1">
                <p className={props.location == null && "hidden"}><Location /> {props.location != null && props.location}</p>
                <p className={props.website == null && "hidden"}><Web /> {props.website != null && props.website}</p>
                <a href="/shop" className="hover:text-white hover:underline ml-6">Shop</a>
            </div>
            {localStorage.getItem("userId") != props.id ?
                 <button className="absolute right-8 top-4 font-semibold bg-cardinal hover:bg-red-800/75 hover:ring-1 text-white rounded-3xl px-5 py-2 text-center">Follow</button>    :
            <a href="/settings" className="absolute right-8 top-4 font-semibold tracking-wide border hover:bg-red-800/50 text-white rounded-3xl px-5 py-2 text-center">Edit profile</a>
            }
        </div>
    )
}
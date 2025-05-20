export default function UserCardMobile(props){
    return(
        <a href={"/user/" + props.username} className="md:hidden text-bone relative mt-4 block px-6 py-4 bg-cardinal/25 rounded-xl">
            <div className="flex justify-start">
                <div className="mt-2 size-16 bg-red-200/40 rounded-full">
                    <img/>
                </div>
                <div className="mb-4 ml-8">
                    <h1 className="text-white font-bold text-lg">{props.nickname != undefined && props.nickname}</h1>
                    <p className="mb-2 text-sm">@{props.username}</p>
                    <p className="text-sm">{props.biography != undefined && props.biography}</p>
                </div>
            </div>
            <div className="grid grid-cols-3">
                <p>{props.location != undefined && props.location}</p>
                <p>{props.website != undefined && props.website}</p>
                <a href="/shop" className="hover:text-white hover:underline">Shop</a>
            </div>
        <button className="absolute right-8 top-4 text-white font-semibold bg-cardinal hover:bg-red-800/75 hover:ring-1 rounded-3xl px-5 py-2 text-center">Follow</button>   
        </a>
    )
}
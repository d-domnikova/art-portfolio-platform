export default function UserCard(props){
    return(
         <a href={"/user/" + props.username} className="hidden md:block md:fixed bg-cardinal/25 h-[88%] px-6 rounded-xl text-bone w-78 top-20 right-4 space-y-2 mx-auto overflow-y-auto overscrol-y-contain">
            <div className="mt-4 md:size-36 size-16 bg-red-200/40 rounded-full justify-self-center ">
                <img/>
            </div>
            <h1 className="text-white font-bold text-3xl justify-self-center">{props.nickname}</h1>
            <p className="justify-self-center pb-4">@{props.username}</p>
            <p className="font-semibold pb-1">{props.location}</p>
            <p className="font-semibold pb-1">{props.website}</p>
            <div className="font-semibold space-x-6 flex pb-4">
                <a href={"/commissions/" + props.username} className="hover:text-white hover:underline">Commissions</a>
                <a href={"/shop/" + props.username} className="hover:text-white hover:underline">Shop</a>
            </div>
            <button className="text-white font-semibold tracking-wide bg-cardinal hover:bg-red-800/75 hover:ring-1 rounded-3xl px-5 py-2 text-center mb-6">Follow</button>
            <p>{props.biography != undefined && props.biography}</p>
        </a>
    )
}
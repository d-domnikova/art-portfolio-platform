export default function UserCard(props){
    return(
        <div className="hidden md:block md:fixed bg-cardinal/25 h-[88%] px-6 rounded-xl text-bone w-78 top-20 right-4 space-y-2 mx-auto overflow-y-auto overscrol-y-contain">
            <div className="mt-4 md:size-36 size-16 bg-red-200/40 rounded-full justify-self-center ">
                <image/>
            </div>
            <h1 className="text-white font-bold text-3xl justify-self-center">Nickname</h1>
            <p className="justify-self-center pb-4">@username</p>
            <p className="font-semibold pb-1">Location</p>
            <p className="font-semibold pb-1">Website</p>
            <div className="font-semibold space-x-6 flex pb-4">
                <a href="/commissions" className="hover:text-white hover:underline">Commissions</a>
                <a href="/shop" className="hover:text-white hover:underline">Shop</a>
            </div>
            <button className="text-white font-semibold tracking-wide bg-cardinal hover:bg-red-800/75 hover:ring-1 rounded-3xl px-5 py-2 text-center mb-6">Follow</button>
            <p>Bio</p>
        </div>
    )
}
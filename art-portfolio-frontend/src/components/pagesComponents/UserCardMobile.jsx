export default function UserCardMobile(props){
    return(
        <div className="md:hidden text-bone relative mt-4 block px-6 py-4 bg-cardinal/25 rounded-xl">
            <div className="flex justify-start">
                <div className="mt-2 size-16 bg-red-200/40 rounded-full">
                    <image/>
                </div>
                <div className="mb-4 ml-8">
                    <h1 className="text-white font-bold text-lg">Nickname</h1>
                    <p className="mb-2 text-sm">@username</p>
                    <p className="text-sm">Bio</p>
                </div>
            </div>
            <div className="grid grid-cols-3">
                <p>Location</p>
                <p>Website</p>
                <a href="/shop" className="hover:text-white hover:underline">Shop</a>
            </div>
        <button className="absolute right-8 top-4 text-white font-semibold bg-cardinal hover:bg-red-800/75 hover:ring-1 rounded-3xl px-5 py-2 text-center">Follow</button>   
        </div>
    )
}
export default function PostPreview(props){

    return(
        <a href="/post/:id" className="group relative aspect-square min-w-30 min-h-30 max-w-64 max-h-64 bg-white rounded-sm cursor-pointer 
                        md:hover:bg-linear-to-b/longer from-transperent to-black/30 transition-all duration-300 ease-in-out">
            <image src="https://placehold.co/320x320"/>
            <div className="hidden md:group-hover:block absolute bottom-0 inset-x-0 text-white">
                <p className="px-8 pt-2 flex flex-wrap font-bold text-xl">Title</p>
                <p className="px-8 pb-2 font-semibold">Username</p>
            </div>
        </a>
    )
}
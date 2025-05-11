import { useNavigate } from "react-router-dom";
import PostPreview from '../pagesComponents/PostPreview'
import UserCard from "../pagesComponents/UserCard";
import UserCardMobile from "../pagesComponents/UserCardMobile";

export default function UserProfile() {
    return (
        <div className="md:grid md:grid-cols-5">
            <div src="https://placehold.co/320x320" className="md:col-span-4">
                <div className="bg-cardinal w-full aspect-4/1 rounded-xl">
                    <image className=""/>
                </div>
                <UserCardMobile />
            <div className="text-bone text-2xl py-4 space-x-6">
                <a href="/portfolio" className={true ? "text-white underline font-bold text-2xl" : "hover:text-white hover:underline"}>Portfolio</a>
                <a href="/all" className={false ? "text-white underline font-bold text-2xl" : "hover:text-white hover:underline"}>All posts</a>
            </div>
                <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                    {/*{posts.map((post) => (
                            <PostPreview key={post.id} 
                             id={post.id} title={post.title} user={post.userId}/>}
                ))*/}
                </div>
            </div>
            <UserCard/>
        </div>
    );
};
import { useState, useEffect } from "react";
import axios from "axios";
import Heart from "../icons/Heart";
import UserCard from "../pagesComponents/UserCard";
import UserCardMobile from "../pagesComponents/UserCardMobile";
import { useParams } from "react-router";

export default function PostPage(props){
    const { id } = useParams()
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([])
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7029/api/post/${id}`)
        .then(response => {axios.get(`https://localhost:7029/api/user/${response.data.userId}`)
            .then(response => {
                setUser(response.data); 
            });
             setPost(response.data);
         })
         .catch(error => {
             console.error(error);
         });

        axios.get('https://localhost:7029/api/comment')
       .then(response => {
            setComments(response.data);
        })
        .catch(error => {
            console.error(error);
        });

    }, []);

    return(
        <>
        <UserCardMobile id={user.id} username={user.username} nickname={user.nickname} 
                        location={user.location} website={user.website} bio={user.biography}/>
        <div className="md:grid md:grid-cols-4 my-4">
            <div className="col-span-3 space-y-4">
                <div className="bg-cardinal w-full h-120 rounded-xl">
                    <img/>
                </div>
                <div>{post.title}</div>
                <div>{post.description}</div>
                <button className="text-white text-lg"><Heart /> 123</button>
                <p className="text-xl text-white font-bold">Comments</p>
                
                <form className="relative w-full min-h-20 flex justify-between space-x-2">
                    <div className="mt-4 size-12 bg-red-200/40 rounded-full">
                        <img/>
                    </div>
                    <textarea name="postComment" className="p-4 pr-20 mt-2 w-full border border-bone rounded-xl outline-hidden resize-none focus:ring 
                            placeholder:text-bone/80 md:placeholder:text-lg" 
                            rows="4" placeholder="Write your comment..."></textarea>
                    <button className="absolute right-6 bottom-4 text-white bg-cardinal hover:bg-red-800/75 hover:ring-1 rounded-3xl px-5 py-2 text-center">Post</button>
                </form>
                {comments.map((comment) => (comment.postId == this.props.id &
                                            <Comment key={comment.id} 
                                            id={comment.id} user={comment.userId} commentBody={comment.commentBody}/>
                ))}
            </div>
            <UserCard id={user.id} username={user.username} nickname={user.nickname} 
                        location={user.location} website={user.website} bio={user.biography}/>
        </div>
    </>
    )
}

function Comment(props){
    return(
        <div className="bg-cardinal/20 w-full min-h-20 rounded-xl text-white">
            <div className="flex justify-start space-x-3">
                <div className="mt-4 ml-2 size-12 bg-red-200/40 rounded-full">
                    <image/>
                </div>
                <div className="space-y-2">
                    <div className="mt-2 flex space-x-2">
                        <h1 className="text-white font-semibold md:text-lg">{props.nickname}</h1>
                        <p className="md:mt-1 md:text-base text-bone/75 text-sm mt-0.5">@{props.username}</p>
                    </div>
                <p className="text-sm md:text-base">{props.commentBody}</p>
                </div>
            </div>
        </div>
    )
}
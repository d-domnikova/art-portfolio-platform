import { useState, useEffect } from "react";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import axios from "axios";
import Heart from "../icons/Heart";
import Comment from "../pagesComponents/Comment";
import UserCard from "../pagesComponents/UserCard";
import UserCardMobile from "../pagesComponents/UserCardMobile";
import DeleteModal from "../modals/DeleteModal";
import { useParams, useNavigate } from "react-router";
import ThreeDots from "../icons/ThreeDots";
import HeartFill from "../icons/HeartFill";

export default function PostPage(){
    const { id } = useParams()
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const [likes, setLikes] = useState([]);
    const [temp, setTemp] = useState({});
    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState({
        commentBody: ""
    });

    useEffect(() => {
        axios.get(`https://localhost:7029/api/post/${id}`)
        .then(response => {axios.get(`https://localhost:7029/api/user/${response.data.userId}`)
            .then(response => {
                setUser(response.data); 
            });
              (response.data.length != 0) ?
             setPost(response.data) : navigate("*");
         })
         .catch(error => {
             console.error(error);
             if (error.status === 400) {navigate("*")}
         });

        axios.get(`https://localhost:7029/api/post/${id}/comments`)
       .then(response => {
            setComments(response.data);
        })
        .catch(error => {
            console.error(error);
        });

        axios.get(`https://localhost:7029/api/post/${id}/likedPosts`)
       .then(response => {
            setLikes(response.data);
        })
        .catch(error => {
            console.error(error);
        });

        axios.get(`https://localhost:7029/api/likedPost/${id}/${localStorage.getItem("userId")}`)
        .then(response => { setTemp(response.data); })
    }, []);

          const handleChange = (e) => {
            const value = e.target.value;
            setNewComment({
              ...newComment,
              [e.target.name]: value,
            });
          };    
        
        const handleSubmit = (e) => {
            if(!localStorage.getItem("isLoggedIn")) navigate("/login");
            e.preventDefault();
            const userData = {
                commentBody: newComment.commentBody,
                postId: post.id,
                userId: localStorage.getItem("userId"),
              };
            axios.post("https://localhost:7029/api/comment", userData, 
                { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}},
              ).then(window.location.reload(false));  
            }

            const addLike = () => {
                if(!localStorage.getItem("isLoggedIn")) navigate("/login");
                const userData ={
                    userId: localStorage.getItem("userId"),
                    postId: id
                }
                axios.post("https://localhost:7029/api/likedPost", userData, 
                { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            }

            const deleteLike = () => {
                axios.delete(`https://localhost:7029/api/likedPost/${id}/${localStorage.getItem("userId")}`, 
                { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            }

            const fullMode =(e)=>{}

    return(
        <>
        <UserCardMobile id={user.id} username={user.username} nickname={user.nickname} 
                        location={user.location} website={user.website} biography={user.biography}/>
        <div className="md:grid md:grid-cols-4 my-4">
            <div className="col-span-3 space-y-4">
                <div className="w-full min-h-70 max-h-150 rounded-xl flex justify-center">
                    <img src={post.imageSrc} className="min-h-70 max-h-150 cursor-pointer" onClick={fullMode}/>
                </div>
                <div className="relative">
                <h1 className="font-bold text-2xl">{post.title}</h1>
                    {localStorage.getItem("userId") == post.userId && 
                    <Popover className="absolute top-2 right-4">
                            <PopoverButton className="mr-8 rounded-full hover:ring"><ThreeDots /></PopoverButton>
                            <PopoverPanel anchor="bottom" className="flex flex-col mt-2 z-30 bg-smoky text-bone p-2 rounded-lg border border-bone space-y-2">
                                <a href={"/post/update/" + post.id} className="block md:hover:text-white p-2">Update</a>
                                <DeleteModal id={post.id} type="post"/>
                            </PopoverPanel>
                        </Popover>}
                </div>
                <div>{post.description}</div>
                <div className="space-x-2">
                    <button className="cursor-pointer" onClick={temp.length !=0 ? (deleteLike) : (addLike)}>
                        {localStorage.getItem("isLoggedIn") && temp.length !=0 ? 
                    <HeartFill /> : <Heart /> }
                    </button>
                <span className="mt-1">{likes.length}</span></div>
                <p className="text-xl text-white font-bold">Comments</p>
                
                <form className="relative w-full min-h-20 flex justify-between space-x-2" onSubmit={handleSubmit}>
                    <div className="mt-4 size-12 bg-red-200/40 rounded-full">
                        <img/>
                    </div>
                    <textarea name="commentBody" value={newComment.commentBody} onChange={handleChange} 
                            className="p-4 pr-20 mt-2 w-full border border-bone rounded-xl outline-hidden resize-none focus:ring placeholder:text-bone/80 md:placeholder:text-lg" 
                            rows="4" placeholder="Write your comment..."></textarea>
                    <button className="absolute right-6 bottom-4 text-white bg-cardinal hover:bg-red-800/75 hover:ring-1 rounded-3xl px-5 py-2 text-center">Post</button>
                </form>
                {comments.map((comment) => (comment.postId == post.id &&
                                            <Comment key={comment.id} 
                                            id={comment.id} userId={comment.userId} commentBody={comment.commentBody}/>
                ))}
            </div>
            <UserCard id={user.id} username={user.username} nickname={user.nickname} 
                        location={user.location} website={user.website} biography={user.biography}/>
        </div>
    </>
    )
}
import { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import axios from "axios";
import PostPreview from '../pagesComponents/PostPreview'
import UserCard from "../pagesComponents/UserCard";
import UserCardMobile from "../pagesComponents/UserCardMobile";
import { useNavigate, useParams } from "react-router-dom";

export default function UserProfile() {
    const navigate = useNavigate();
    const { params } = useParams();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7029/api/post/`)
        .then(response => {
             setPosts(response.data);
         })
         .catch(error => {
             console.error(error);
         });

        axios.get(`https://localhost:7029/api/user/username/${params}`)
          .then(response => {
            (response.data.length != 0) ?
            setUser(response.data) : navigate("/*");
         })
         .catch(error => {
             console.error(error);
             if (error.status === 400) {navigate("/*")}
         });
         
    }, []);


    return (
        <div className="md:grid md:grid-cols-5">
            <div src="https://placehold.co/320x320" className="md:col-span-4">
                <div className="bg-cardinal w-full aspect-4/1 rounded-xl">
                    <img className=""/>
                </div>
                 {user.map((u) => (<UserCardMobile id={u.id} username={u.username} nickname={u.nickname} 
                        location={u.location} website={u.website} bio={u.biography}/>))}
                <TabGroup>
                    <TabList className="text-bone text-2xl py-4 space-x-6">
                        <Tab className="data-selected:text-white data-selected:underline data-selected:font-bold 
                                        data-selected:text-2xl hover:text-white hover:underline focus:not-data-focus:outline-none">Portfolio</Tab>
                        <Tab className="data-selected:text-white data-selected:underline data-selected:font-bold 
                                        data-selected:text-2xl hover:text-white hover:underline focus:not-data-focus:outline-none">All posts</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                            {posts.map((post) => ((post.userId == user[0].id && post.isVisibleInPortfolito) &&
                                    <PostPreview key={post.id} 
                                    id={post.id} title={post.title} user={post.userId}/>
                        ))}
                        </TabPanel>
                        <TabPanel className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                            {posts.map((post) => (post.userId == user[0].id &&
                                    <PostPreview key={post.id} 
                                    id={post.id} title={post.title} user={post.userId}/>
                        ))}
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        {user.map((u) => (<UserCard id={u.id} username={u.username} nickname={u.nickname} 
                        location={u.location} website={u.website} bio={u.biography}/>))}
    </div>
    );
};
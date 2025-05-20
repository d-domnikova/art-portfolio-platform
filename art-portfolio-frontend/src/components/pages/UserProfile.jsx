import { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import axios from "axios";
import PostPreview from '../pagesComponents/PostPreview'
import UserCard from "../pagesComponents/UserCard";
import UserCardMobile from "../pagesComponents/UserCardMobile";
import { useParams } from "react-router-dom";

export default function UserProfile() {
    const { params } = useParams();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);

    console.log(params)

    useEffect(() => {
        axios.get(`https://localhost:7029/api/user/username/${params}`)
          .then(response => {
             setUser(response.data);
         })
         .catch(error => {
             console.error(error);
         });
         
        axios.get(`https://localhost:7029/api/post/`)
        .then(response => {
             setPosts(response.data);
         })
         .catch(error => {
             console.error(error);
         });
    }, []);


    return (
        <div className="md:grid md:grid-cols-5">
            <div src="https://placehold.co/320x320" className="md:col-span-4">
                <div className="bg-cardinal w-full aspect-4/1 rounded-xl">
                    <img className=""/>
                </div>
                <UserCardMobile id={user[0].id} username={user[0].username} nickname={user[0].nickname} 
                        location={user[0].location} website={user[0].website} bio={user[0].biography}/>
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
        <UserCard id={user[0].id} username={user[0].username} nickname={user[0].nickname} 
                        location={user[0].location} website={user[0].website} bio={user[0].biography}/>
    </div>
    );
};
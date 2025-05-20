import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import axios from 'axios';
import PostPreview from '../pagesComponents/PostPreview'

export default function ExplorePage() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const keyword = useParams();
    const location = useLocation();
    console.log(keyword)

    useEffect(() => {
       axios.get('https://localhost:7029/api/category')
       .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        if (location.pathname == "/"){
            axios.get('https://localhost:7029/api/post')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        } else {
            axios.get(`https://localhost:7029/api/post/search/${keyword.value}`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        }
}, []);

    return(
        <div>
            <div className='md:fixed bg-smoky -mt-4 pt-4 z-10 w-full'>
            <h1 className="text-3xl text-white font-bold pb-6">Explore</h1>
            <div className='space-x-3 font-semibold mb-4'>
            {categories.map((category) => (<Category key={category.id} 
                                        id={category.id} title={category.categoryName} />
            ))}
            </div>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pt-32">
            {posts.map((post) => (<PostPreview key={post.id} 
                                        id={post.id} title={post.title} postImage={post.postImage} user={post.userId}/>
            ))}
            </div>
        </div>
    )
}

function Category(props){
    return(
        <a href={"/search="+ props.title} className='inline-block px-3 py-2 border border-bone rounded-sm hover:bg-bone/20'>{props.title}</a>
    )
}